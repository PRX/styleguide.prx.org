import { AuroraPlayback } from './aurora-playback';

describe('AuroraPlayback', () => {

  let player: any, playback: AuroraPlayback;
  beforeEach(() => {
    player = {on: (name, fn) => null, play: () => null, preload: () => null, stop: () => null};
    window['AV'] = {Player: {fromFile: () => player, fromURL: () => player}};
    playback = new AuroraPlayback('some-href');
  });

  it('listens for the duration', () => {
    jest.spyOn(player, 'on').mockImplementation((name, fn: any) => {
      if (name === 'duration') { fn(5000); }
    });
    let data: any;
    let sub = playback.play().subscribe(d => data = d);
    expect(data.duration).toEqual(5000);
    expect(sub.closed).toEqual(false);
  });

  it('follows progress', () => {
    jest.spyOn(player, 'on').mockImplementation((name, fn: any) => {
      if (name === 'progress') { fn(2000); }
    });
    let data: any;
    let sub = playback.play().subscribe(d => data = d);
    expect(data.progress).toEqual(2000);
    expect(sub.closed).toEqual(false);
  });

  it('completes at the end of file', () => {
    jest.spyOn(player, 'on').mockImplementation((name, fn: any) => {
      if (name === 'end') { fn(); }
    });
    let sub = playback.play().subscribe();
    expect(sub.closed).toEqual(true);
  });

  it('stops the player on unsubscribe', () => {
    jest.spyOn(player, 'stop').mockImplementation(jest.fn());
    let sub = playback.play().subscribe();
    expect(player.stop).not.toHaveBeenCalled();
    sub.unsubscribe();
    expect(player.stop).toHaveBeenCalled();
  });

});
