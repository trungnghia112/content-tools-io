import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { find } from 'lodash-es';
import Libs from '@shared/utils/libs';

@Component({
  selector: 'app-partials-crawl-check-domain',
  templateUrl: './crawl-check-domain.component.html',
  styleUrls: ['./crawl-check-domain.component.scss']
})
export class PartialsCrawlCheckDomainComponent implements OnInit, OnChanges {
  @Input() link: string;
  @Input() domainsData: any;
  domain: string;
  domainStatus = 'not_support';

  constructor() {
  }

  ngOnChanges(): void {
    if (this.link && this.domainsData) {
      this.domain = Libs.extractHostname(this.link);
      const domainData: any = find(this.domainsData, ['domain', this.domain]);
      if (domainData) {
        this.domainStatus = domainData.status;
      }
    }
  }

  ngOnInit(): void {
  }

}
