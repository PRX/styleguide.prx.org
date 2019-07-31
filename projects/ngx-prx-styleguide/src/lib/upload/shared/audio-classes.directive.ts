import { Directive, Input, HostBinding, DoCheck } from '@angular/core';
import { AudioFileModel } from '../model';

@Directive({
  selector: '[prxAudioClasses]'
})
export class AudioClassesDirective implements DoCheck {

  @Input() publishAudioClasses: AudioFileModel;

  @HostBinding('class') stateClasses = '';

  ngDoCheck() {
    this.stateClasses = 'audio';
    if (this.publishAudioClasses.canceled) {
      this.stateClasses += ' canceled';
    }
    if (this.publishAudioClasses.changed() && !this.publishAudioClasses.invalid()) {
      this.stateClasses += ' changed';
    }
    if (this.publishAudioClasses.isUploading) {
      this.stateClasses += ' changed';
    }
  }

}
