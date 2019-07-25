import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { UploadComponent } from './upload.component';
import { FreeReorderDirective, FreeUploadComponent } from './free';
import { IllegalUploadComponent } from './illegal';
import { AudioCancelDirective, AudioClassesDirective, AudioDurationComponent,
         AudioInputComponent, AudioPlayerComponent, AudioStateComponent,
         ClickDirective } from './shared';
import { TemplatedUploadComponent } from './templated';
import { DurationPipe, FileSizePipe, FileSelectDirective } from './file';
import { FancyFormModule } from '../fancy-form/fancy-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AudioCancelDirective,
    AudioClassesDirective,
    AudioDurationComponent,
    AudioInputComponent,
    AudioPlayerComponent,
    AudioStateComponent,
    ClickDirective,
    FreeReorderDirective,
    FreeUploadComponent,
    IllegalUploadComponent,
    TemplatedUploadComponent,
    UploadComponent,
    DurationPipe,
    FileSizePipe,
    FileSelectDirective
  ],
  exports: [
    ClickDirective,
    CommonModule,
    DragulaModule,
    UploadComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DragulaModule,
    FancyFormModule
  ],
  providers: []
})

export class UploadModule { }
