import { Component, Input } from '@angular/core';
import { AudioVersionModel, AudioFileModel } from '../model';

@Component({
  selector: 'prx-illegal-upload',
  styleUrls: ['../shared/audio.css', 'illegal-upload.component.css'],
  template: `
  <div *ngIf="!file.isDestroy" class="audio" [class.canceled]="file.canceled">

    <div class="main">
      <div class="type">
        <span>{{file.label}}</span>
      </div>
      <div class="info">
        <span>{{file.filename}}</span>
        <prx-audio-duration [file]="file"></prx-audio-duration>
      </div>
      <div class="state">
        <p>Segment not in template - please remove!</p>
      </div>
    </div>

    <div class="cancel">
      <button class="btn-icon icon-cancel" [prxAudioCancel]="file" [version]="version"></button>
    </div>

  </div>
  `
})

export class IllegalUploadComponent {

  @Input() version: AudioVersionModel;
  @Input() file: AudioFileModel;

}
