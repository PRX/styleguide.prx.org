import { Component, Input } from '@angular/core';
import { AudioVersionModel, AudioFileModel } from '../model';

@Component({
  selector: 'prx-free-upload',
  styleUrls: ['../shared/audio.css', 'free-upload.component.css'],
  template: `
    <div *ngIf="!file.isDestroy" [prxAudioClasses]="file">

      <div class="reorder">
        <button class="btn-icon icon-menu drag-handle" aria-label="Reorder"></button>
      </div>

      <div class="main">
        <div class="type">
          <input type="text" [ngModel]="file.label" (ngModelChange)="labelChange($event)"
            [class.changed]="labelChanged" [class.invalid]="labelInvalid"/>
        </div>
        <div class="info">
          <span>{{file.filename}}</span>
          <prx-audio-duration [file]="file"></prx-audio-duration>
          <prx-audio-player [file]="file"></prx-audio-player>
        </div>
        <prx-audio-state [file]="file"></prx-audio-state>
      </div>

      <div class="cancel">
        <button class="btn-icon icon-cancel" [prxAudioCancel]="file" [version]="version" aria-label="Remove"></button>
      </div>

    </div>
  `
})

export class FreeUploadComponent {

  @Input() version: AudioVersionModel;
  @Input() file: AudioFileModel;

  labelChange(value: string) {
    this.file.set('label', value);
  }

  get labelChanged(): boolean {
    return !this.file.isNew && this.file.changed('label');
  }

  get labelInvalid(): boolean {
    return this.file.invalid('label') ? true : false;
  }

}
