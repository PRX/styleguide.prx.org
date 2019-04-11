import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { IconComponent } from './icon.component';

const req = require.context('../../assets/images/icons/', false, /\.svg$/);
export const iconNames = req.keys()
  // Convert filenames to icon names.
  .map(filename => filename.match(/\/([^\/]+)\.svg$/)[1])
  // Filter out legacy colorized icons.
  .filter(name => name.indexOf('ic_') === -1);

export const iconColorOptions = {
  Inherit: null,
  Default: 'default',
  Primary: 'primary',
  Secondary: 'secondary',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Light: 'light',
  Dark: 'dark',
};

@NgModule({
  declarations: [IconComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  exports: [IconComponent]
})
export class IconModule { }
