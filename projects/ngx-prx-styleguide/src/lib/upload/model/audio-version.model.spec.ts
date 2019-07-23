import { AudioVersionModel } from './audio-version.model';
import { AudioFileModel } from './audio-file.model';
import { MockHalService } from '../../hal/mock/mock-hal.service';

const cms = new MockHalService();

describe('AudioVersionModel', () => {

  let seriesMock: any, storyMock: any, versionMock: any, templateMock: any;
  beforeEach(() => {
    window.localStorage.clear();
    seriesMock = cms.mock('prx:series', {id: 'the-series-id'});
    storyMock = cms.mock('prx:story', {id: 'the-story-id'});
    templateMock = cms.mock('prx:audio-version-template', {id: 'the-template-id'});
    jest.spyOn(AudioFileModel.prototype, 'init').mockImplementation(function(parent, file: any) {
      this.filename = 'foobar';
      this.uuid = 'fake-uuid';
      this.status = 'complete';
      this.label = (file && file.label) ? file.label : undefined;
      this.position = (file && file.position) ? file.position : undefined;
      this.isDestroy = (file && file.isDestroy) ? true : false;
    });
  });

  const makeVersion = (data?: any, files?: any[]) => {
    versionMock = data ? storyMock.mock('prx:audio-version', data) : null;
    if (versionMock) { versionMock.mockList('prx:audio', files || []); }
    return new AudioVersionModel({series: seriesMock, story: storyMock,
      template: templateMock, version: versionMock});
  };

  describe('constructor', () => {

    it('copies properties from the version doc', () => {
      let version = makeVersion({label: 'foobar'});
      expect(version.label).toEqual('foobar');
    });

    it('sets a default title', () => {
      let version = makeVersion(null);
      expect(version.label).toEqual('Main Audio');
    });

    it('grabs the label from the template', () => {
      templateMock.label = 'hello world';
      let version = makeVersion(null);
      expect(version.label).toEqual('hello world');
    });

    it('sets the validators', () => {
      let version = makeVersion(null);
      expect(version.VALIDATORS['self'].length).toEqual(1);
    });

  });

  describe('key', () => {

    it('uses the audio version id', () => {
      expect(makeVersion({id: 'version-id'}).key()).toContain('.version-id');
    });

    it('uses the audio template id', () => {
      expect(makeVersion(null).key()).toContain('.the-template-id');
    });

    it('falls back to the story id', () => {
      templateMock = null;
      expect(makeVersion(null).key()).toContain('new.the-story-id');
    });

    it('falls way back to the series id', () => {
      templateMock = null;
      storyMock = null;
      expect(makeVersion(null).key()).toContain('series.the-series-id');
    });

    it('also has a key for new stories', () => {
      templateMock = null;
      storyMock = null;
      seriesMock = null;
      expect(makeVersion(null).key()).toMatch(/\.new$/);
    });

  });

  describe('related', () => {

    it('loads existing audio files', () => {
      let version = makeVersion({}, [{thing: 'one', status: 'complete'}, {thing: 'two', status: 'complete'}]);
      expect(version.files.length).toEqual(2);
    });

    it('loads newly uploaded files', () => {
      let version = makeVersion({}, [{thing: 'one', status: 'complete'}]);
      expect(version.files.length).toEqual(1);
      version.setUploads('prx:audio', ['1234']);
      version.related().files.subscribe((files: any[]) => {
        expect(files.length).toEqual(2);
      });
    });

    it('loads audio templates', () => {
      templateMock.mockItems('prx:audio-file-templates', ['one', 'two']);
      let version = makeVersion(null);
      expect(version.template).toBeTruthy();
      expect(version.fileTemplates.length).toEqual(2);
      expect(version.hasFileTemplates).toEqual(true);
    });

    it('assigns templates to files', () => {
      templateMock.mockItems('prx:audio-file-templates', [{position: 1}, {position: 3}, {position: 2}]);
      let version = makeVersion({}, [{position: 2}, {position: 1, isDestroy: true}, {position: 4}]);
      expect(version.filesAndTemplates.length).toEqual(4);
      expect(version.filesAndTemplates[0].file).toBeNull();
      expect(version.filesAndTemplates[1].file).not.toBeNull();
      expect(version.filesAndTemplates[2].file).toBeNull();
      expect(version.filesAndTemplates[3].tpl).toBeNull();
    });

    it('includes duplicate positions when assigning templates to files', () => {
      templateMock.mockItems('prx:audio-file-templates', [{position: 1, label: 'at1'}, {position: 2, label: 'at2'}]);
      let files = [{position: 1, label: 'f1'}, {position: 1, label: 'f2'}, {position: 2, label: 'f3'}];
      let version = makeVersion({}, files);
      expect(version.filesAndTemplates.length).toEqual(3);

      // files assigned a template will have their label overwritten
      expect(version.filesAndTemplates[0].file.label).toEqual('at1');
      expect(version.filesAndTemplates[0].tpl).not.toBeNull();
      expect(version.filesAndTemplates[1].file.label).toEqual('at2');
      expect(version.filesAndTemplates[1].tpl).not.toBeNull();

      // oldest file (1st in the files[]) doesn't get a template
      expect(version.filesAndTemplates[2].file.label).toEqual('f1');
      expect(version.filesAndTemplates[2].tpl).toBeNull();
    });

  });

  describe('encode', () => {

    it('sets label and translates explicit', () => {
      let version = makeVersion({label: 'foobar', explicit: 'clean'});
      expect(version.encode()).toEqual({label: 'foobar', explicit: 'clean'});
      version = makeVersion({label: 'foobar', explicit: 'yes'});
      expect(version.encode()).toEqual({label: 'foobar', explicit: 'yes'});
      version = makeVersion({label: 'foobar', explicit: ''});
      expect(version.encode()).toEqual({label: 'foobar', explicit: ''});
    });

  });

  describe('saveNew', () => {

    it('creates a new version off the story', () => {
      let version = makeVersion();
      jest.spyOn(storyMock, 'create').mockImplementation((rel: string) => {
        expect(rel).toEqual('prx:audio-versions');
      });
      version.saveNew({label: 'world'});
      expect(storyMock.create).toHaveBeenCalled();
    });

  });

  describe('invalid', () => {

    it('requires at least one audio file', () => {
      let version = makeVersion({label: 'hello'}, []);
      expect(version.invalid()).toMatch(/upload at least 1/);
    });

  });

  describe('addUpload', () => {

    it('adds and saves the new upload uuid', () => {
      let version = makeVersion({label: 'hello'}, []);
      jest.spyOn(version, 'store').mockImplementation(jest.fn());
      version.addUpload(<any> {uuid: 'fake-uuid'});
      expect(version.files.length).toEqual(1);
      let uploads = [];
      version.getUploads('prx:audio').subscribe(d => uploads = d);
      expect(uploads).toEqual(['fake-uuid']);
      expect(version.store).toHaveBeenCalled();
    });

  });

  describe('watchUpload', () => {

    it('lets the file with the matching uuid see the upload', () => {
      let version = makeVersion({label: 'hello'}, [{uuid: 'fake-uuid', status: 'uploading'}]);
      expect(version.files.length).toEqual(1);
      jest.spyOn(version.files[0], 'watchUpload').mockImplementation(jest.fn());
      version.watchUpload(<any> {uuid: '1234'});
      expect(version.files[0].watchUpload).not.toHaveBeenCalled();
      version.watchUpload(<any> {uuid: 'fake-uuid'});
      expect(version.files[0].watchUpload).toHaveBeenCalled();
    });

  });

  describe('assignPositions', () => {

    it('sets positions and labels', () => {
      let version = makeVersion({}, [{}, {isDestroy: true}, {}]);
      version.assignPositions();
      expect(version.files[0].position).toEqual(1);
      expect(version.files[0].label).toEqual('Segment A');
      expect(version.files[1].position).toBeUndefined();
      expect(version.files[1].label).toBeUndefined();
      expect(version.files[2].position).toEqual(2);
      expect(version.files[2].label).toEqual('Segment B');
    });

    it('does not set labels if non default', () => {
      let version = makeVersion({}, [{label: 'foobar'}, {isDestroy: true}, {}]);
      version.assignPositions();
      expect(version.files[0].position).toEqual(1);
      expect(version.files[0].label).toEqual('foobar');
      expect(version.files[1].position).toBeUndefined();
      expect(version.files[1].label).toBeUndefined();
      expect(version.files[2].position).toEqual(2);
      expect(version.files[2].label).toBeUndefined();
    });

  });

  it('knows when there are no audio files', () => {
    let version = makeVersion({}, [{thing: 'one', status: 'complete'}]);
    expect(version.noAudioFiles).toEqual(false);
    version.files[0].isDestroy = true;
    expect(version.noAudioFiles).toEqual(true);
    version.fileTemplates = [<any> 'one'];
    expect(version.noAudioFiles).toEqual(false);
  });

  it('counts undestroyed audio', () => {
    let version = makeVersion({}, [{thing: 'one', status: 'complete'}]);
    expect(version.audioCount).toEqual(1);
    version.files[0].isDestroy = true;
    expect(version.audioCount).toEqual(0);
  });

});
