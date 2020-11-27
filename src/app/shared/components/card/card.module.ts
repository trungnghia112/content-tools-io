import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedCardComponent,
  SharedCardFooterComponent,
  SharedCardHeaderComponent
} from './card.component';
import { SharedNavTabModule } from '@shared/components/nav-tab/nav-tab.module';

@NgModule({
  imports: [
    CommonModule,
    SharedNavTabModule
  ],
  declarations: [
    SharedCardHeaderComponent,
    SharedCardFooterComponent,
    SharedCardComponent
  ],
  exports: [
    SharedCardHeaderComponent,
    SharedCardFooterComponent,
    SharedCardComponent
  ]
})
export class SharedCardModule {
}
