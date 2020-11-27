import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedAppModule } from '@shared/shared.module';
import { ArticleReactionsModule } from '../article-reactions/article-reactions.module';
import { CrawlCheckDomainModule } from '../crawl-check-domain/crawl-check-domain.module';
import { PublishFilterModule } from '../publish-filter/publish-filter.module';


@NgModule({
  declarations: [AsideComponent],
  exports: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    SharedAppModule,
    ProgressSpinnerModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    ChipsModule,
    MultiSelectModule,
    ArticleReactionsModule,
    CrawlCheckDomainModule,
    PublishFilterModule
  ]
})
export class AsideModule {
}
