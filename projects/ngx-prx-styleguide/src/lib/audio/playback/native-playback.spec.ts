import { NativePlayback } from './native-playback';

describe('NativePlayback', () => {

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
    let sub = playback.play().subscribe(d => data = d);
    expect(data.duration).toEqual(5000);
    expect(sub.closed).toEqual(false);
  });

  it('follows progress', () => {
    jest.spyOn(element, 'addEventListener').mockImplementation((name, fn: any) => {
      if (name === 'timeupdate') { element.currentTime = 2000; fn(); }
    });
    let data: any;
    let sub = playback.play().subscribe(d => data = d);
    expect(data.progress).toEqual(2000);
    expect(sub.closed).toEqual(false);
  });

  it('completes at the end of file', () => {
    jest.spyOn(element, 'addEventListener').mockImplementation((name, fn: any) => {
      if (name === 'ended') { fn(); }
    });
    let sub = playback.play().subscribe();
    expect(sub.closed).toEqual(true);
  });

  it('stops the player on unsubscribe', () => {
    jest.spyOn(element, 'pause').mockImplementation(jest.fn());
    let sub = playback.play().subscribe();
    expect(element.pause).not.toHaveBeenCalled();
    sub.unsubscribe();
    expect(element.pause).toHaveBeenCalled();
  });

});
