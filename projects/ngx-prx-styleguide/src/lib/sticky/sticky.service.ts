import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StickyService {

  private offsets: { [name: string]: number } = { all: 0, default: 0 };

  constructor() { }

  initGroup(group: string) {
    if (this.offsets[group] === undefined) {
      this.offsets[group] = 0;
    }
  }

  getOffset(group: string = 'default') {
    return this.offsets.all + (group !== 'all' ? this.offsets[group] || 0 : 0);
  }

  addOffset(offset: number, group: string = 'default') {
    this.initGroup(group);
    this.offsets[group] += offset;
  }

  removeOffset(offset: number, group: string = 'default') {
    this.offsets[group] -= offset;
  }

}
