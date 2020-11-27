import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-box-loading',
  templateUrl: './box-loading.component.html',
  styleUrls: ['./box-loading.component.scss']
})
export class SharedBoxLoadingComponent implements OnInit {
  @Input() type: string; // circle, bar
  @Input() size: string; // md, sm
  constructor() {
    this.type = 'circle';
    this.size = 'md';
  }

  ngOnInit() {
  }

}
