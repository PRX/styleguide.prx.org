import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EpisodeCardComponent } from './episode-card.component';

@NgModule({
  declarations: [
    EpisodeCardComponent
  ],
  exports: [
    EpisodeCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})

export class EpisodeListModule { }
