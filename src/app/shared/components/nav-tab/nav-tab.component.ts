import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavTab } from './nav-tab';

@Component({
  selector: 'app-shared-nav-tab',
  templateUrl: 'nav-tab.component.html'
})

export class SharedNavTabComponent implements OnChanges {
  @Input() tabs: NavTab[];
  @Input() break = 3;
  @Input() setTabActive: string;
  @Input() cssClass: string;
  @Output() currentTab: EventEmitter<NavTab> = new EventEmitter<NavTab>();
  tabActive: NavTab;

  constructor(private router: Router) {
  }

  ngOnChanges(): void {
    const link = this.setTabActive;
    const tab = this.tabs.find((obj: NavTab) => {
      return obj.link === link;
    });
    if (tab) {
      this.tabActive = tab;
    }
  }

  onTab(tab: NavTab) {
    this.tabActive = tab;

    if (tab.type === 'link') {
      this.router.navigateByUrl(tab.link);
    } else {
      this.currentTab.emit(tab);
    }
  }
}

