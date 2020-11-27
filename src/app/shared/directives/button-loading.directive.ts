import { Directive } from '@angular/core';

@Directive({selector: '[appBtnLoading]'})
export class ButtonLoadingDirective {
}

// import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
/*
export class ButtonLoadingDirective implements OnChanges {
  condition: boolean;

  @Input() set appBtnLoading(condition: boolean) {
    this.condition = condition;
  }

  icon = this.renderer.createElement('i');

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    if (this.condition) {
      // after
      // const span = this.renderer.createElement('span');
      // const text = this.renderer.createText('Click here to add li');
      // this.renderer.appendChild(span, text);
      // this.renderer.appendChild(this.elRef.nativeElement, span);

      // before
      this.renderer.addClass(this.icon, 'icon-12-loading');
      const refChild = this.elRef.nativeElement.firstChild || null;
      this.renderer.insertBefore(this.elRef.nativeElement, this.icon, refChild);
    } else {
      this.renderer.removeChild(this.elRef.nativeElement, this.icon);
    }
  }
}
*/
