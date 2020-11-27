import { Component } from '@angular/core';
import { AsideService } from './partials/aside/aside.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'content-tools';

  constructor(public asideService: AsideService,
              private updates: SwUpdate) {
    this.updates.available.subscribe(() => {
      // if (confirm('New version available. Load New Version?')) {
      updates.activateUpdate().then(() => document.location.reload());
      // }
    });
  }
}
