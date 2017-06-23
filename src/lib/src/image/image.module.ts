import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageLoaderComponent } from './image-loader.component';

@NgModule({
  declarations: [
    ImageLoaderComponent
  ],
  exports: [
    ImageLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})

export class ImageModule { }
