import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeViewComponent } from './theme-view.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ImgResizableModule } from '../img-resizable/img-resizable.module';

@NgModule({
  declarations: [ThemeViewComponent],
  exports: [
    ThemeViewComponent
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    FormsModule,
    ImgResizableModule
  ]
})
export class ThemeViewModule {
}
