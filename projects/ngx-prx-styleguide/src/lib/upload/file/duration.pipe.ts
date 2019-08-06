import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor(totalSeconds % 3600 / 60);
    const s = Math.floor(totalSeconds % 3600 % 60);
    return `${h}:` + (m < 10 ? `0${m}:` : `${m}:`) + (s < 10 ? `0${s}` : `${s}`);
  }

}
