import {of as observableOf, throwError as observableThrowError } from 'rxjs';
import { PlayerService } from './player.service';
import { UnsupportedFileError } from './playback';

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

class FakeValidation {
  validate(): any {
    return observableOf('the-validation');
  }
}

describe('PlayerService', () => {

  let service = new PlayerService();

  let aurora: FakePlayback, native: FakePlayback, valid: FakeValidation;
  beforeEach(() => {
    aurora = new FakePlayback();
    native = new FakePlayback();
    valid = new FakeValidation();
    jest.spyOn(<any> service, 'auroraPlayback').mockImplementation(() => this.playback = aurora);
    jest.spyOn(<any> service, 'nativePlayback').mockImplementation(() => this.playback = native);
    jest.spyOn(<any> service, 'auroraValidation').mockImplementation(() => valid);
  });

  xit('plays and stops the native player', () => {
    service.play('some-href').subscribe();
    expect(native.playing).toBeTruthy();
    expect(aurora.playing).toBeFalsy();
    service.stop();
    expect(native.playing).toBeFalsy();
    expect(aurora.playing).toBeFalsy();
  });

  xit('falls back to the aurora player', () => {
    native.playingErr = new UnsupportedFileError('bad file!');
    service.play('some-href').subscribe();
    expect(native.playing).toBeTruthy();
    expect(aurora.playing).toBeTruthy();
    service.stop();
    expect(native.playing).toBeTruthy();
    expect(aurora.playing).toBeFalsy();
  });

  it('throws non playback errors from the native player', () => {
    native.playingErr = new Error('something else went wrong');
    let err: any;
    service.play('some-href').subscribe(
      () => { throw new Error('expected an error'); },
      e => err = e
    );
    expect(native.playing).toBeTruthy();
    expect(aurora.playing).toBeFalsy();
    expect(err.message).toEqual('something else went wrong');
  });

  xit('seeks the player', () => {
    service.seek(0.5);
    expect(native.progress).toEqual(0);
    service.play('some-href').subscribe();
    service.seek(0.5);
    expect(native.progress).toEqual(0.5);
  });

  it('checks file format', () => {
    let validation = null;
    service.checkFile(<any> 'the-file').subscribe(v => validation = v);
    expect(validation).toEqual('the-validation');
  });

});
