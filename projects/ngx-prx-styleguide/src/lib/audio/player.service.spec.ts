import {of as observableOf, throwError as observableThrowError } from 'rxjs';
import { PlayerService } from './player.service';

class FakePlayback {
  playing = false;
  playingErr = null;
  progress = 0;
  play(): any {
    this.playing = true;
    return this.playingErr ? observableThrowError(this.playingErr) : observableOf(true);
  }
  seek(p: number) { this.progress = p; }
  stop() { this.playing = false; }
}

describe('PlayerService', () => {

  let service = new PlayerService();

  let native: FakePlayback;

  beforeEach(() => {
    native = new FakePlayback();
    jest.spyOn(<any> service, 'nativePlayback').mockImplementation(function() { return this.playback = native });
  });

  it('plays and stops the native player', () => {
    service.play('some-href').subscribe();
    expect(native.playing).toBeTruthy();
    service.stop();
    expect(native.playing).toBeFalsy();
  });

  it('throws non playback errors from the native player', () => {
    native.playingErr = new Error('something else went wrong');
    let err: any;
    service.play('some-href').subscribe(
      () => { throw new Error('expected an error'); },
      e => err = e
    );
    expect(native.playing).toBeTruthy();
    expect(err.message).toEqual('something else went wrong');
  });

  it('seeks the player', () => {
    service.seek(0.5);
    expect(native.progress).toEqual(0);
    service.play('some-href').subscribe();
    service.seek(0.5);
    expect(native.progress).toEqual(0.5);
  });

});
