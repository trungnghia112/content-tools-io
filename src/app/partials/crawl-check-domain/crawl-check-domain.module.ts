import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsCrawlCheckDomainComponent } from './crawl-check-domain.component';


@NgModule({
  declarations: [
    PartialsCrawlCheckDomainComponent
  ],
  exports: [
    PartialsCrawlCheckDomainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrawlCheckDomainModule {
}
