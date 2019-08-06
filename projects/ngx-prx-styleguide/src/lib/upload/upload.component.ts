import { Component, Input, HostBinding, OnInit, DoCheck } from '@angular/core';
import { AudioVersionModel } from './model';

@Component({
  selector: 'prx-upload',
  styleUrls: ['upload.component.css'],
  template: `
    <header>
      <strong>{{version.label}}</strong>
      <span>{{versionDescription()}}</span>
    </header>

    <section *ngIf="version.hasFileTemplates">
      <div class="uploads">
        <ng-container *ngFor="let ft of version.filesAndTemplates">
          <prx-templated-upload *ngIf="ft.tpl" [template]="ft.tpl"
            [file]="ft.file" [version]="version" prxClick
            [accept]="version.getContentType()"></prx-templated-upload>
          <prx-illegal-upload *ngIf="!ft.tpl" [file]="ft.file"
            [version]="version"></prx-illegal-upload>
        </ng-container>
      </div>
    </section>

    <section prxClick>
      <section *ngIf="!version.hasFileTemplates">
        <div class="uploads" [prxFreeReorder]="version">
          <label>
            <div *ngIf="version.noAudioFiles" class="empty" >
              <h4>Upload a file to get started</h4>
            </div>
          </label>
          <prx-free-upload *ngFor="let f of version.files"
            [file]="f" [version]="version" prxClick>
          </prx-free-upload>
        </div>
      </section>

      <footer [class.templated]="version.hasFileTemplates">
        <p *ngIf="invalidMessage" class="error">{{invalidMessage | capitalize}}</p>
        <prx-audio-input *ngIf="!version.hasFileTemplates" multiple=true
          [version]="version" [accept]="version.getContentType()"></prx-audio-input>
      </footer>
    </section>
  `
})

export class UploadComponent implements DoCheck {

  @Input() version: AudioVersionModel;
  @Input() strict: boolean;

  DESCRIPTIONS = [
    {test: /piece audio/i, desc: 'The standard version of your episode you would most like people to hear and buy'},
    {test: /promos/i, desc: 'The promotional version of your audio'},
    {test: /video/i, desc: 'The video file for your episode'},
    {test: /./, desc: 'The audio files for your episode, in mp3 format.'}
  ];

  @HostBinding('class.changed') changedClass = false;

  @HostBinding('class.invalid') invalidClass = false;

  invalidMessage: string = null;

  ngDoCheck() {
    this.changedClass = false;
    this.invalidClass = false;
    this.invalidMessage = null;
    if (this.version) {
      if (this.version.invalid('files', this.strict)) {
        this.invalidClass = this.versionUploadedInvalid();
      } else if (this.version.invalid('self', this.strict) && this.version.changed()) {
        this.invalidClass = true;
        this.invalidMessage = this.version.invalid('self', this.strict);
      } else if (this.version.changed('files')) {
        this.changedClass = !this.versionUndeletedHaveChanged();
      } else if (this.version.changed(null, false)) {
        this.changedClass = true; // version itself changed, not files
      } else if (this.version.nonMatchingFiles()) {
        this.invalidClass = true;
        this.invalidMessage = this.version.nonMatchingFiles();
      } else if (this.version.status === 'invalid') {
        this.invalidClass = true;
        this.invalidMessage = this.version.statusMessage;
      }
    }
  }

  versionDescription(): string {
    const label = this.version['label'] || '';
    const desc = this.DESCRIPTIONS.find(d => d.test.test(label));
    if (desc) {
      return desc.desc;
    }
    return '';
  }

  versionUploadedInvalid(): boolean {
    return this.version.files.filter(f => !f.isUploading).some(f => !!f.invalid(null, this.strict));
  }

  versionUndeletedHaveChanged(): boolean {
    return this.version.files.filter(f => !f.isDestroy).some(f => f.changed());
  }

}
