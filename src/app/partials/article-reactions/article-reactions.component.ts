import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-partials-article-reactions',
  templateUrl: './article-reactions.component.html',
  styleUrls: ['./article-reactions.component.scss']
})
export class ArticleReactionsComponent implements OnInit {
  @Input() data: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
