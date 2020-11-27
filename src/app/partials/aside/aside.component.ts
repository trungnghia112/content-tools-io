import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from './articles.service';
import { AsideService } from './aside.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  posts$: Observable<any>;
  domainsData: any;
  visibleFilter: boolean;

  constructor(private articlesService: ArticlesService,
              public asideService: AsideService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  onGetPost(item: any) {

  }

  onCreateImage(item: any) {
    const body = {
      ...item,
      images: [
        item.image_link
      ],
      paragraphs: [
        item.excerpt
      ]
    };
    this.articlesService.saveCurrentPost(body);
    this.asideService.hide();
  }

  getData(bodyParams: any = null) {
    this.posts$ = this.articlesService.getFbPosts(bodyParams);
  }
}
