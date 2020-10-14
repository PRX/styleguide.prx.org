import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { FreeReorderDirective } from './free/free-reorder.directive';
import { FreeUploadComponent } from './free/free-upload.component';
import { IllegalUploadComponent } from './illegal/illegal-upload.component';
import { AudioCancelDirective } from './shared/audio-cancel.directive';
import { AudioClassesDirective } from './shared/audio-classes.directive';
import { AudioDurationComponent } from './shared/audio-duration.component';
import { AudioInputComponent } from './shared/audio-input.component';
import { AudioPlayerComponent } from './shared/audio-player.component';
import { AudioStateComponent } from './shared/audio-state.component';
import { ClickDirective } from './shared/click.directive';
import { TemplatedUploadComponent } from './templated/templated-upload.component';
import { FancyFormModule } from '../fancy-form/fancy-form.module';
import { FileSelectDirective } from './file/file-select.directive';
import { DurationPipe } from './file/duration.pipe';
import { FileSizePipe } from './file/filesize.pipe';
import { UploadComponent } from './upload.component';

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
    FileSelectDirective,
    ClickDirective
  ],
  exports: [
    ClickDirective,
    CommonModule,
    DragulaModule,
    UploadComponent,
    DurationPipe,
    FileSizePipe,
    FileSelectDirective
  ],
  imports: [FormsModule, CommonModule, DragulaModule, FancyFormModule],
  // provided by DragulaModule as well but Publish stand alone story with free-reorder uploader throws No provider for DragulaService error
  providers: [DragulaService]
})
export class UploadModule {}
