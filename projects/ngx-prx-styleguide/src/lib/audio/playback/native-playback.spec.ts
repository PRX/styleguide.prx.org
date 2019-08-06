import { NativePlayback } from './native-playback';

describe('NativePlayback', () => {

  describe('Local playback', () => {
    it('creates an object URL if passed a file', () => {
      const fakeUrl = 'blob:fake';
      URL.createObjectURL = jest.fn(() => fakeUrl);
      URL.revokeObjectURL = jest.fn();
      const elMock = { setAttribute: jest.fn(), addEventListener: jest.fn() };
      jest.spyOn(document, 'createElement').mockImplementation(() => (<any> elMock));
      const objUrlSpy = jest.spyOn(NativePlayback.prototype, 'newAudioObjectUrl');
      const localPlayback = new NativePlayback(new File([], 'fake.mp3'));

      expect(objUrlSpy).toHaveBeenCalledTimes(1);
      expect(elMock.setAttribute).toHaveBeenCalledWith('src', fakeUrl);
      localPlayback.newAudioObjectUrl(new File([], 'fake2.mp3'));
      expect(objUrlSpy).toHaveBeenCalledTimes(2);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(fakeUrl);
    });
  });

  describe('Remote playback', () => {
    let element: any, playback: NativePlayback;
    beforeEach(() => {
      element = {addEventListener: () => null, play: () => null, pause: () => null};
      jest.spyOn(<any> NativePlayback.prototype, 'build').mockImplementation(() => element);
      playback = new NativePlayback('some-href');
    });

    it('listens for the duration', () => {
      jest.spyOn(element, 'addEventListener').mockImplementation((name, fn: any) => {
        if (name === 'durationchange') { element.duration = 5000; fn(); }
      });
      let data: any;
      const sub = playback.play().subscribe(d => data = d);
      expect(data.duration).toEqual(5000);
      expect(sub.closed).toEqual(false);
    });

    it('follows progress', () => {
      jest.spyOn(element, 'addEventListener').mockImplementation((name, fn: any) => {
        if (name === 'timeupdate') { element.currentTime = 2000; fn(); }
      });
      let data: any;
      const sub = playback.play().subscribe(d => data = d);
      expect(data.progress).toEqual(2000);
      expect(sub.closed).toEqual(false);
    });

    it('completes at the end of file', () => {
      jest.spyOn(element, 'addEventListener').mockImplementation((name, fn: any) => {
        if (name === 'ended') { fn(); }
      });
      const sub = playback.play().subscribe();
      expect(sub.closed).toEqual(true);
    });

    it('stops the player on unsubscribe', () => {
      jest.spyOn(element, 'pause').mockImplementation(jest.fn());
      const sub = playback.play().subscribe();
      expect(element.pause).not.toHaveBeenCalled();
      sub.unsubscribe();
      expect(element.pause).toHaveBeenCalled();
    });
  });
});
