import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabDemoComponent } from './tab-demo.component';
import { TabContentFirstDemoComponent } from './tab-content-first-demo.component';
import { TabContentSecondDemoComponent } from './tab-content-second-demo.component';
import { TabContentThirdDemoComponent } from './tab-content-third-demo.component';

export const tabDemoRoutes: Routes = [
  {
    path: 'tab',
    component: TabDemoComponent,
    children: [
      { path: '',          component: TabContentFirstDemoComponent },
      { path: 'second', component: TabContentSecondDemoComponent },
      { path: 'third',   component: TabContentThirdDemoComponent }
    ]
  }
];

export const tabDemoComponents: any[] = [
  TabDemoComponent,
  TabContentFirstDemoComponent,
  TabContentSecondDemoComponent,
  TabContentThirdDemoComponent
];

export const tabDemoRouting: ModuleWithProviders = RouterModule.forChild(tabDemoRoutes);
