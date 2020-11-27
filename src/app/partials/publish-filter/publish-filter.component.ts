import { Component, OnInit } from '@angular/core';
import { PublishFilterConstants } from './publish-filter-constants';
import { ArticlesService } from '../aside/articles.service';

@Component({
  selector: 'app-publish-filter',
  templateUrl: './publish-filter.component.html',
  styleUrls: ['./publish-filter.component.scss']
})
export class PublishFilterComponent implements OnInit {
  sizeData: any[] = PublishFilterConstants.sizeData;
  contentTypeData: any[] = PublishFilterConstants.contentTypeData;
  sortByData: any[] = PublishFilterConstants.sortByData;
  filterByDateData: any[] = PublishFilterConstants.filterByDateData;

  bodyParams: any;

  constructor(public articlesService: ArticlesService) {
    this.articlesService.bodyParams$.subscribe(params => this.bodyParams = params);
  }

  ngOnInit(): void {
  }
}
