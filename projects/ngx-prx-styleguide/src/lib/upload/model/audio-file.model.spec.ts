//import { cms } from '../../../testing';
import { EMPTY as observableEmpty } from 'rxjs';
import { AudioFileModel } from './audio-file.model';
import { MockHalService } from '../../hal/mock/mock-hal.service';

const cms = new MockHalService();

describe('AudioFileModel', () => {

  let versionMock: any, fileMock: any;
  const makeFile = (data?: any) => {
    versionMock = cms.mock('prx:version', {id: 'the-version-id'});
    fileMock = null;
    if (typeof data === 'string') {
      return new AudioFileModel(<any> {}, versionMock, data);
    } else if (data) {
      data.status = 'complete';
      fileMock = versionMock.mock('prx:audio', data);
      return new AudioFileModel(<any> {}, versionMock, fileMock);
    } else {
      return new AudioFileModel(<any> {}, versionMock, null);
    }
  };

  describe('setTemplate', () => {

    it('grabs the label from the template', () => {
      let file = makeFile(null);
      file.setTemplate(<any> {label: 'hello world'});
      expect(file.label).toEqual('hello world');
    });

    it('resets the validators', () => {
      let file = makeFile(null);
      file.VALIDATORS['self'] = null;
      file.setTemplate(<any> {});
      expect(file.VALIDATORS['self'].length).toEqual(1);
    });

  });

  describe('decode', () => {

    it('translates audio metadata', () => {
      let file = makeFile({
        bitRate: 128,
        frequency: '44.1',
        channelMode: 'foo',
        contentType: 'bar',
        layer: 4
      });
      expect(file.bitrate).toEqual(128000);
      expect(file.frequency).toEqual(44100);
      expect(file.channelmode).toEqual('foo');
      expect(file.contenttype).toEqual('bar');
      expect(file.layer).toEqual(4);
    });

    it('ignores missing audio metadata', () => {
      let file = makeFile({});
      expect(file.bitrate).toBeUndefined();
      expect(file.frequency).toBeUndefined();
    });

  });

  describe('key', () => {

    it('uses the id for the key', () => {
      expect(makeFile({id: 'audio-file-id'}).key()).toContain('audio-file-id');
    });

    it('falls back to the upload uuid', () => {
      expect(makeFile('some-uuid').key()).toContain('some-uuid');
    });

    it('will just call it a new file if nothing else', () => {
      let nothin = new AudioFileModel(null, null, null);
      expect(nothin.key()).toMatch(/\.new$/);
    });

  });

  describe('saveNew', () => {

    it('creates a new file off the version', () => {
      let audio = makeFile();
      jest.spyOn(versionMock, 'create').mockImplementation((rel: string) => {
        expect(rel).toEqual('prx:audio');
        return observableEmpty;
      });
      audio.saveNew({hello: 'world'});
      expect(versionMock.create).toHaveBeenCalled();
    });

  });

  describe('destroy', () => {

    it('deletes new files from local storage', () => {
      let audio = makeFile({id: 1234});
      jest.spyOn(audio, 'unstore').mockImplementation(jest.fn());
      audio.destroy();
      expect(audio.unstore).not.toHaveBeenCalled();
      audio.isNew = true;
      audio.destroy();
      expect(audio.unstore).toHaveBeenCalled();
    });

  });

});
