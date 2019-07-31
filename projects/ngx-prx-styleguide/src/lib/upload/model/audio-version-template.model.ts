import {of as observableOf, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { REQUIRED, LENGTH, IN, VERSION_LENGTH } from './invalid';
import { AudioFileTemplateModel } from './audio-file-template.model';
import { BaseModel } from '../../model/base.model';
import { HalDoc } from '../../hal/doc/haldoc';

export class AudioVersionTemplateModel extends BaseModel {

  static CONTENT_TYPES = {
    MP3: 'audio/mpeg',
    MP2: 'audio/mp2',
    VIDEO: 'video/mpeg',
    VIDEO_ALT: 'video/x-mpeg'
  };

  static ALL_CONTENT_TYPES = [
    'audio/mpeg',
    'audio/mp2',
    'video/mpeg',
    'video/x-mpeg'
  ];


  public id: number;
  public label: string = null;
  public contentType = AudioVersionTemplateModel.CONTENT_TYPES.MP3;
  public lengthMinimum: number = null;
  public lengthMaximum: number = null;
  public fileTemplates: AudioFileTemplateModel[];
  private newIndex: number = null;

  SETABLE = ['label', 'contentType', 'lengthMinimum', 'lengthMaximum'];

  VALIDATORS = {
    label: [REQUIRED(), LENGTH(1, 255)],
    contentType: [REQUIRED(), IN(AudioVersionTemplateModel.ALL_CONTENT_TYPES)],
    lengthMinimum: [VERSION_LENGTH(this)],
    lengthMaximum: [VERSION_LENGTH(this)]
  };

  constructor(series?: HalDoc, docOrIndex?: HalDoc | number, loadRelated = true) {
    super();
    if (docOrIndex instanceof HalDoc) {
      this.init(series, docOrIndex, loadRelated);
    } else {
      this.newIndex = docOrIndex || 0;
      this.init(series, null, loadRelated);
    }
  }

  key() {
    if (this.doc) {
      return `prx.audio-version-template.${this.doc.id}`;
    } else if (this.parent) {
      return `prx.audio-version-template.new.${this.parent.id}.${this.newIndex}`;
    } else {
      return `prx.audio-version-template.new.new.${this.newIndex}`;
    }
  }

  related() {
    let files: Observable<AudioFileTemplateModel[]>;
    if (this.doc) {
      files = this.doc.followItems('prx:audio-file-templates').pipe(map(ftdocs => {
        const saved = ftdocs.map(ft => new AudioFileTemplateModel(this.parent, this.doc, ft));
        const unsaved = this.findUnsavedFiles(saved.length + 1);
        return saved.concat(unsaved);
      }));
    } else {
      files = observableOf(this.findUnsavedFiles(1));
    }
    return {
      fileTemplates: files
    };
  }

  decode() {
    this.id = this.doc['id'];
    this.label = this.doc['label'] || '';
    this.contentType = this.doc['contentType'] || AudioVersionTemplateModel.CONTENT_TYPES.MP3;
    this.lengthMinimum = this.doc['lengthMinimum'] || null;
    this.lengthMaximum = this.doc['lengthMaximum'] || null;
  }

  encode(): {} {
    const data = <any> {};
    data.label = this.label;
    data.contentType = this.contentType;
    data.lengthMinimum = this.lengthMinimum || 0;
    data.lengthMaximum = this.lengthMaximum || 0;
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    return this.parent.create('prx:audio-version-templates', {}, data);
  }

  invalid(field?: string | string[]): string {
    if (field === 'lengthAny') {
      return this.invalid('lengthMinimum') || this.invalid('lengthMaximum');
    } else {
      return super.invalid(field);
    }
  }

  addFile(label?: string, forceOriginal = false): AudioFileTemplateModel {
    const count = this.fileTemplates.length;
    if (!label) {
      const segLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[count % 26];
      label = `Segment ${segLetter}`;
    }
    const file = new AudioFileTemplateModel(this.parent, this.doc || this.newIndex, count + 1);
    file.set('label', label, forceOriginal);
    this.fileTemplates.push(file);
    return file;
  }

  findUnsavedFiles(position, found: AudioFileTemplateModel[] = []) {
    const file = new AudioFileTemplateModel(this.parent, this.doc || this.newIndex, position);
    if (file.isStored() && !file.isDestroy) {
      found.push(file);
      return this.findUnsavedFiles(position + 1, found);
    } else {
      return found;
    }
  }

  get isAudio(): boolean {
    return !!this.contentType.match(/^audio\//);
  }

}
