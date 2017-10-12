import { Component } from '@angular/core';
import { OverlaySpinnerService } from './overlay.spinner.service';

@Component({
  moduleId: module.id,
  selector: 'prx-overlay-spinner',
  template: `
    <div *ngIf="shown" class="overlay">
      <prx-spinner *ngIf="shown"></prx-spinner>
    </div>
  `,
  styleUrls: ['overlay.spinner.component.css']
})
export class OverlaySpinnerComponent {
  private shown = false;

  constructor(private overlay: OverlaySpinnerService) {
    overlay.showing.subscribe(shouldShow => {
      this.shown = shouldShow;
    });
  }
}