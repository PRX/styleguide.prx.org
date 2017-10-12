import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlaySpinnerComponent } from './overlay.spinner.component';
import { OverlaySpinnerService } from './overlay.spinner.service';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [
    OverlaySpinnerComponent,
    SpinnerComponent
  ],
  exports: [
    OverlaySpinnerComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    OverlaySpinnerService
  ]
})

export class SpinnerModule { }
