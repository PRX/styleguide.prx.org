import {throwError as observableThrowError, Observable , Subscriber } from 'rxjs';
import { PlaybackMetadata, AudioPlayback, UnsupportedFileError } from './playback';

/*
 * Native <audio> playback
 */

let audioObjectUrl = null;
export class NativePlayback implements AudioPlayback {

  private el: HTMLAudioElement;
  private data: PlaybackMetadata;
  private sub: Subscriber<PlaybackMetadata>;
  private playable = false;

  constructor(src: File | string) {
    this.el = this.build(src);
    this.data = <PlaybackMetadata> {progress: 0};
  }

  newAudioObjectUrl(audio: File): string {
    // Browsers will release object URLs automatically when the document is unloaded; however, for optimal
    // performance and memory usage, if there are safe times when you can explicitly unload them, you should do so.
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    if (audioObjectUrl) { URL.revokeObjectURL(audioObjectUrl); }
    audioObjectUrl = URL.createObjectURL(audio);
    return audioObjectUrl;
  }

  play(): Observable<PlaybackMetadata> {
    if (!this.el) {
      return observableThrowError(new UnsupportedFileError('Only remote playback supported'));
    }
    return Observable.create(sub => {
      this.sub = sub;

      this.el.addEventListener('durationchange', () => {
        this.data.duration = this.el.duration;
        sub.next(this.data);
      });
      this.el.addEventListener('timeupdate', () => {
        this.data.progress = this.el.currentTime;
        sub.next(this.data);
      });
      this.el.addEventListener('ended', () => sub.complete());
      this.el.addEventListener('error', err => {
        if (this.playable) {
          sub.error(new Error('Unknown native playback error'));
        } else {
          sub.error(new UnsupportedFileError('Playback of this filetype not supported'));
        }
      });

      // some browsers return a promise that can throw errors (can't cast this)
      const promise = this.el.play();
      if (promise && promise['catch']) {
        promise['catch'](err => null); // error event already covers this
      }

      return () => this.el && this.el.pause();
    });
  }

  seek(percent: number) {
    if (this.data && this.data.duration) {
      this.el.currentTime = this.data.duration * percent;
    }
  }

  stop() {
    if (this.sub) {
      this.sub.complete();
    }
  }

  private build(src: File | string): HTMLAudioElement {
    const el = document.createElement('audio');
    if (typeof(src) === 'string') {
      el.setAttribute('src', src);
    } else {
      el.setAttribute('src', this.newAudioObjectUrl(src));
    }

    el.addEventListener('playable', () => this.playable = true);
    return el;
  }

}
