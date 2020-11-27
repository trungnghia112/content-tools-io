import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleReactionsComponent } from './article-reactions.component';
import { SharedAppModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ArticleReactionsComponent
  ],
  exports: [
    ArticleReactionsComponent
  ],
  imports: [
    CommonModule,
    SharedAppModule
  ]
})
export class ArticleReactionsModule {
}
