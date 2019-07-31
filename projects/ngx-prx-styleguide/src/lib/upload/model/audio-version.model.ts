import {forkJoin as observableForkJoin, Observable } from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import { AudioFileModel } from './audio-file.model';
import { VERSION_TEMPLATED, LENGTH, REQUIRED} from './invalid';
import { HasUpload, applyMixins } from './upload';
import { HalDoc } from '../../hal/doc/haldoc';
import { Upload } from '../service';
import { BaseModel } from '../../model/base.model';

export class AudioVersionModel extends BaseModel implements HasUpload {

  static DEFAULT_LABEL = 'Main Audio';

  public id: number;
  public label: string;
  public explicit = '';
  public status: string;
  public statusMessage: string;

  // save in-progress uploads to localstorage
  SETABLE = ['label', 'explicit', 'hasUploadMap'];

  VALIDATORS = {
    self: [VERSION_TEMPLATED()],
    label: [REQUIRED(), LENGTH(1, 255)]
  };

  public series: HalDoc;
  public template: HalDoc;
  public fileTemplates: HalDoc[] = [];
  public hasFileTemplates = false;
  public filesAndTemplates: {tpl: HalDoc, file: AudioFileModel}[] = [];
  public files: AudioFileModel[];

  // HasUpload mixin
  hasUploadMap: string;
  getUploads: (rel: string) => Observable<(HalDoc|string)[]>;
  setUploads: (rel: string, uuids?: string[]) => void;

  getContentType() {
    if (this.template && this.template.hasOwnProperty('contentType')) {
      return this.template['contentType'];
    }
    return null;
  }

  constructor(params: {series?: HalDoc, story?: HalDoc, template?: HalDoc, version?: HalDoc}) {
    super();
    this.series = params.series;
    this.template = params.template;
    if (this.template) {
      this.hasFileTemplates = this.template.count('prx:audio-file-templates') ? true : false;
    }
    this.VALIDATORS['self'] = [VERSION_TEMPLATED(params.template)];
    this.init(params.story, params.version);
    this.setLabel();
  }

  private setLabel() {
    const docLabel = this.doc ? this.doc['label'] : null;
    const tplLabel = this.template ? this.template['label'] : null;
    const label = docLabel || tplLabel || AudioVersionModel.DEFAULT_LABEL;
    if (this.doc) {
      this.set('label', label, true); // probably already set to this
    } else {
      this.set('label', label, false);
    }
  }

  key() {
    if (this.doc) {
      return `prx.audio-version.${this.doc.id}`;
    } else if (this.template && this.parent) {
      return `prx.audio-version.new.${this.parent.id}.${this.template.id}`;
    } else if (this.template) {
      return `prx.audio-version.new.template.${this.template.id}`; // new for template
    } else if (this.parent) {
      return `prx.audio-version.new.${this.parent.id}`; // existing story
    } else if (this.series) {
      return `prx.audio-version.new.series.${this.series.id}`; // new story in series
    } else {
      return `prx.audio-version.new`; // new standalone story
    }
  }

  related() {
    const fileSort = (f1, f2) => f1.position - f2.position;

    let files = this.getUploads('prx:audio').pipe(map(audios => {
      const docs = audios.map(docOrUuid => new AudioFileModel(this.template, this.doc, docOrUuid));
      this.setUploads('prx:audio', docs.map(d => d.uuid));
      return docs.sort(fileSort);
    }));

    // optionally load-and-assign file templates
    if (this.hasFileTemplates) {
      const tpls = this.template.followItems('prx:audio-file-templates');
      files = observableForkJoin(files, tpls).pipe(map(([models, tdocs]) => {
        this.fileTemplates = tdocs.sort(fileSort);
        return models;
      }), finalize(() => this.reassign()), );
    }

    return {files: files};
  }

  decode() {
    this.id = this.doc['id'];
    this.label = this.doc['label'];
    switch (this.doc['explicit']) {
      case 'yes':
        this.explicit = 'Explicit';
        break;
      case 'clean':
        this.explicit = 'Clean';
        break;
      default:
        this.explicit = '';
        break;
    }
    this.status = this.doc['status'];
    this.statusMessage = this.doc['statusMessage'];
  }

  encode(): {} {
    const data = <any> {};
    data.label = this.label;
    switch (this.explicit) {
      case 'Explicit':
        data.explicit = 'yes';
        break;
      case 'Clean':
        data.explicit = 'clean';
        break;
      default:
        data.explicit = '';
        break;
    }
    if (this.isNew && this.template) {
      data.set_audio_version_template_uri = this.template.expand('self');
    }
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    return this.parent.create('prx:audio-versions', {}, data);
  }

  changed(field?: string | string[], includeRelations = true): boolean {
    if (this.parent && this.parent.id && this.isNew) {
      return true;
    } else {
      return super.changed(field, includeRelations);
    }
  }

  // clear status messages, as it's easier than refreshing
  saveRelated(): Observable<boolean[]> {
    if (this.changed('files')) {
      this.status = null;
      this.statusMessage = null;
    }
    return super.saveRelated();
  }

  discard() {
    super.discard();
    this.files.sort((f1, f2) => f1.position - f2.position);
    this.setLabel();
    this.reassign();
    return false; // don't discard
  }

  addUpload(upload: Upload, position?: number): AudioFileModel {
    const audio = new AudioFileModel(this.template, this.doc, upload);
    if (position) {
      audio.set('position', position);
      this.files = [...this.files]; // trigger change detection
      for (let i = 0; i <= this.files.length; i++) {
        if (!this.files[i] || this.files[i].position >= audio.position) {
          this.files.splice(i, 0, audio);
          break;
        }
      }
    } else {
      this.files = [...this.files, audio];
    }
    this.reassign();
    this.setUploads('prx:audio', this.files.map(f => f.uuid));
    return audio;
  }

  removeUpload(file: AudioFileModel) {
    if (file.isNew) {
      this.files = this.files.filter(f => f !== file);
    } else {
      this.files = [...this.files]; // trigger change detection
    }
    this.setUploads('prx:audio', this.files.map(f => f.uuid));
    this.reassign();
  }

  reassign() {
    if (this.hasFileTemplates) {
      this.assignTemplates();
    } else {
      this.assignPositions();
    }
  }

  assignPositions() {
    let position = 1;
    const defaultLabels = this.files.every(f => {
      return !f.label || !!f.label.match(/Segment [A-Z]/);
    });
    this.files.forEach(f => {
      if (!f.isDestroy) {
        f.set('position', position++);
        if (defaultLabels) {
          const segLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(f.position - 1) % 26];
          f.set('label', `Segment ${segLetter}`);
        }
      }
    });
  }

  assignTemplates() {
    if (this.files && this.fileTemplates) {
      this.filesAndTemplates = [];
      for (const t of this.fileTemplates) {
        this.filesAndTemplates.push({file: null, tpl: t});
      }

      // fill templates in reverse order - newest files first
      const files = this.files.filter(file => !file.isDestroy).reverse();
      for (const f of files) {
        const ft = this.filesAndTemplates.find(ftmp => ftmp.tpl && ftmp.tpl['position'] === f.position);
        if (ft && !ft.file) {
          f.setTemplate(ft.tpl);
          ft.file = f;
        } else {
          f.setTemplate(null);
          this.filesAndTemplates.push({file: f, tpl: null});
        }
      }
    }
  }

  watchUpload(upload: Upload) {
    for (const file of this.files) {
      if (file.uuid === upload.uuid) {
        file.watchUpload(upload, false);
      }
    }
  }

  nonMatchingFiles(): string {
    const invalid = this.invalid('self', true);
    return (invalid && invalid.match(/non-matching/i)) ? invalid : null;
  }

  get noAudioFiles(): boolean {
    return this.fileTemplates.length < 1 && this.files.every(f => f.isDestroy);
  }

  get audioCount(): number {
    return this.files.filter(f => !f.isDestroy).length;
  }

}

applyMixins(AudioVersionModel, [HasUpload]);
