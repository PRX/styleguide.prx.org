import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'prx-spinner',
  styleUrls: ['spinner.component.css'],
  template: `
    <div *ngIf="isSpinning" [class.overlay]="overlay" [class.overlay-fixed]="overlayFixed">
      <span class="loading" *ngIf="loadingMessage">{{loadingMessage}}</span>
      <div class="spinner" [class.inverse]="inverse"></div>
    </div>
  `
})

export class SpinnerComponent implements OnDestroy {

  private currentTimeout: any;

  isSpinning = true;

  @Input() public inverse = false;
  @Input() public delay = 300;
  @Input() public overlay = false;
  @Input() public overlayFixed = false;
  @Input() public loadingMessage: string;

  @Input() public set spinning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isSpinning = false;
    }
    if (this.currentTimeout) {
      return;
    }
    this.currentTimeout = setTimeout(() => {
      this.isSpinning = value;
      this.cancelTimeout();
    }, this.delay);
  }

  private cancelTimeout(): void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = undefined;
    }
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }

}
