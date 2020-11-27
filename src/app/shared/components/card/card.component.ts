import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BlockableUI } from '@shared/components/common/blockableui';
import { NavTab } from '@shared/components/nav-tab/nav-tab';

@Component({
  selector: 'app-card-header',
  template: `
    <h3 *ngIf="header" class="card-header-title">
      {{ header }}
      <small *ngIf="subHeader">{{ subHeader }}</small>
    </h3>
    <ng-container *ngIf="tabs">
      <app-shared-nav-tab class="w-100" [tabs]="tabs" [setTabActive]="setTabActive" (currentTab)="onCurrentTab($event)"></app-shared-nav-tab>
    </ng-container>
    <div class="card-header-toolbar" [class]="toolbarClass">
      <ng-content></ng-content>
    </div>
  `
})
export class SharedCardHeaderComponent implements OnChanges {


  @HostBinding('class') classes = 'card-header';
  @Input() header: string;
  @Input() subHeader: string;
  @Input() tabs: any;
  @Input() setTabActive: string;
  @Input() styleClass: string;
  @Input() toolbarClass: string;
  @Output() currentTab: EventEmitter<NavTab> = new EventEmitter<NavTab>();

  constructor(private el: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.styleClass) {
      this.el.nativeElement.classList = this.styleClass;
    }
  }

  onCurrentTab(tab: NavTab) {
    this.currentTab.emit(tab);
  }
}

@Component({
  selector: 'app-card-footer',
  template: '<ng-content></ng-content>'
})
export class SharedCardFooterComponent {
  @HostBinding('class') classes = 'card-footer';
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content *ngIf="headerFacet" select="app-card-header"></ng-content>
    <div class="card-body">
      <ng-content></ng-content>
    </div>
    <ng-content *ngIf="footerFacet" select="app-card-footer"></ng-content>
  `
})
export class SharedCardComponent implements OnChanges, BlockableUI {
  @HostBinding('class') classes = 'card';

  @Input() style: any;

  @Input() styleClass: string;

  @ContentChild(SharedCardHeaderComponent) headerFacet;

  @ContentChild(SharedCardFooterComponent) footerFacet;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.styleClass) {
      this.el.nativeElement.classList = this.styleClass;
    }
  }

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }
}
