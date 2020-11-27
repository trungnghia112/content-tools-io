import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgResizableComponent } from './img-resizable.component';

@NgModule({
  declarations: [
    ImgResizableComponent
  ],
  exports: [
    ImgResizableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ImgResizableModule {
}
