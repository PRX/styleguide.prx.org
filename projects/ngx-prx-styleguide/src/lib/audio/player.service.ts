import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



import { AudioPlayback, NativePlayback, PlaybackMetadata } from './playback';
import { AudioValidation, NativeValidation, ValidationMetadata } from './validation';

@Injectable()
export class PlayerService {

  private playback: AudioPlayback;

  play(fileOrUrl: File | string): Observable<PlaybackMetadata> {
    this.stop();

    return this.nativePlayback(fileOrUrl).play();
  }

  seek(percent: number) {
    if (this.playback) {
      this.playback.seek(percent);
    }
  }

  stop() {
    if (this.playback) {
      this.playback.stop();
    }
  }

  checkFile(file: File): Observable<ValidationMetadata> {
    return this.nativeValidation(file).validate();
  }

  private nativePlayback(fileOrUrl: File | string): AudioPlayback {
    return this.playback = new NativePlayback(fileOrUrl);
  }

  private nativeValidation(fileOrUrl: File | string): AudioValidation {
    return new NativeValidation(fileOrUrl);
  }

}
