import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBtnBack]'
})
export class ButtonBackDirective {
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.preventDefault();
    history.back();
  }
}
