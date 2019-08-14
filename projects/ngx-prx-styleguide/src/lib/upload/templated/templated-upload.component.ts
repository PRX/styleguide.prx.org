import { Component, Input } from '@angular/core';
import {
  AudioVersionModel,
  AudioFileModel,
  AudioVersionTemplateModel
} from '../model';

@Component({
  selector: 'prx-templated-upload',
  styleUrls: ['../shared/audio.css', 'templated-upload.component.css'],
  template: `
    <div *ngIf="file && !file.isDestroy" [prxAudioClasses]="file">

      <div class="main">
        <div class="type">
          <span>{{file.label}}</span>
        </div>
        <div class="info">
          <span>{{file.filename}}</span>
          <prx-audio-duration [file]="file"></prx-audio-duration>
          <prx-audio-player [file]="file"></prx-audio-player>
        </div>
        <prx-audio-state [file]="file"></prx-audio-state>
      </div>

      <div class="cancel">
        <button class="btn-icon icon-cancel" [prxAudioCancel]="file" [version]="version"></button>
      </div>

    </div>
    <div *ngIf="!file || file.isDestroy" class="audio template">

      <div class="main">
        <div class="type">
          <span>{{template.label}}</span>
        </div>
        <div class="info">
          <span *ngIf="template.lengthMinimum && template.lengthMaximum">
            Length between {{template.lengthMinimum | duration}} and {{template.lengthMaximum | duration}}
          </span>
          <span *ngIf="template.lengthMinimum && !template.lengthMaximum">
            Length greater than {{template.lengthMinimum | duration}}
          </span>
          <span *ngIf="!template.lengthMinimum && template.lengthMaximum">
            Length less than {{template.lengthMaximum | duration}}
          </span>
        </div>
      </div>

      <div class="cancel">
        <prx-audio-input [position]="template['position']" [version]="version" [accept]="accept"></prx-audio-input>
      </div>

    </div>
  `
})

export class TemplatedUploadComponent {

  @Input() version: AudioVersionModel;
  @Input() template: AudioVersionTemplateModel;
  @Input() file: AudioFileModel;
  @Input() accept: string;

}
