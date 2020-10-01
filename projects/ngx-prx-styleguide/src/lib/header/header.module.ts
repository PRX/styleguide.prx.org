import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as moduleExports from './';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [moduleExports.HeaderComponent, moduleExports.NavItemComponent, moduleExports.NavUserComponent],
  exports: [moduleExports.HeaderComponent, moduleExports.NavItemComponent, moduleExports.NavUserComponent]
})
export class HeaderModule {}
