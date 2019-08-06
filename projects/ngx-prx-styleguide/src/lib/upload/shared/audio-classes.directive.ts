import { Directive, Input, HostBinding, DoCheck } from '@angular/core';
import { AudioFileModel } from '../model';

@Directive({
  selector: '[prxAudioClasses]'
})
export class AudioClassesDirective implements DoCheck {

  @Input() prxAudioClasses: AudioFileModel;

  @HostBinding('class') stateClasses = '';

  ngDoCheck() {
    this.stateClasses = 'audio';
    if (this.prxAudioClasses.canceled) {
      this.stateClasses += ' canceled';
    }
    if (this.prxAudioClasses.changed() && !this.prxAudioClasses.invalid()) {
      this.stateClasses += ' changed';
    }
    if (this.prxAudioClasses.isUploading) {
      this.stateClasses += ' changed';
    }
  }

}
