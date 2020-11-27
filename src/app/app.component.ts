import { Component } from '@angular/core';
import { AsideService } from './partials/aside/aside.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'content-tools';

  constructor(public asideService: AsideService) {
  }
}
