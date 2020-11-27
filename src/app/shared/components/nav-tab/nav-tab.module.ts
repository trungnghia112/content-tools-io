import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedNavTabComponent } from './nav-tab.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
  ],
  declarations: [
    SharedNavTabComponent
  ],
  exports: [
    SharedNavTabComponent
  ]
})
export class SharedNavTabModule {
}
