import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutofocusInputDirective } from './autofocus.directive';
import { HrefDirective } from './href.directive';
import { DropZoneDirective } from './drop-zone.directive';
import { ButtonLoadingDirective } from './button-loading.directive';
import { ButtonBackDirective } from './button-back.directive';

const directivesArr = [
  AutofocusInputDirective,
  HrefDirective,
  DropZoneDirective,
  ButtonLoadingDirective,
  ButtonBackDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...directivesArr
  ],
  exports: [
    ...directivesArr
  ]
})
export class DirectivesModule {
}
