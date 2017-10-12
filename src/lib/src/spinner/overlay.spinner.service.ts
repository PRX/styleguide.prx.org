import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class OverlaySpinnerService {
  public showing: Observable<boolean>;
  private observer: Observer<boolean>;

  constructor() {
    this.showing = Observable.create((observer: Observer<boolean>) => {
      this.observer = observer;
    });
  }

  show() {
    this.observer.next(true);
  }

  hide() {
    this.observer.next(false);
  }
}
