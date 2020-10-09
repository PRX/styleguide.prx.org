import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { NavItemComponent } from './navitem.component';
import { NavUserComponent } from './navuser.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, NavItemComponent, NavUserComponent],
  providers: [],
  exports: [HeaderComponent, NavItemComponent, NavUserComponent]
})
export class HeaderModule {}
