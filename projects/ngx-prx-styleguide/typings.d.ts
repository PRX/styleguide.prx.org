// TODO: create a @type for aurora
interface AssetFormat {
  bitrate: number;
  channelsPerFrame: number;
  floatingPoint: boolean;
  formatID: string;
  layer: number;
  sampleRate: number;
}
declare namespace AV {
  class Asset {
    active: boolean;
    duration: number;
    format: AssetFormat;
    metadata: any;
    static fromURL(url: string): Asset;
    static fromFile(file: File): Asset;
    get(event: string, callback: Function);
  }
  class Player {
    duration: number;
    playing: boolean;
    currentTime: number;
    static fromURL(url: string): Player;
    static fromFile(file: File): Player;
    on(event: string, callback: Function);
    preload();
    play();
    seek(timeMs: number);
    pause();
    stop();
  }
}
