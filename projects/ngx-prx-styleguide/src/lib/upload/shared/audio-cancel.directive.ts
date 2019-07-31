import { Directive, Input, HostListener } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { AudioFileModel, AudioVersionModel } from '../model';

@Directive({
  selector: '[prxAudioCancel]'
})
export class AudioCancelDirective {

  @Input() delay = 1000;

  @Input() prxAudioCancel: AudioFileModel;

  @Input() version: AudioVersionModel;

  constructor(private modal: ModalService) {}

  @HostListener('click') onClick() {
    if (this.prxAudioCancel.isUploading) {
      this.cancelAndDestroy();
    } else {
      this.modal.confirm(
        'Really delete?',
        'Are you sure you want to remove this audio file?',
        (confirm: boolean) => confirm && this.cancelAndDestroy()
      );
    }
  }

  cancelAndDestroy() {
    this.prxAudioCancel.canceled = true;
    setTimeout(() => {
      this.prxAudioCancel.destroy();
      this.version.removeUpload(this.prxAudioCancel);
      this.prxAudioCancel.canceled = false;
    }, this.delay);
  }

}
