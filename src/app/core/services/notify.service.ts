import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private msgSource = new Subject<Msg | null>();

  msg = this.msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = {content, style};
    this.msgSource.next(msg);
  }

  clear() {
    this.msgSource.next(null);
  }
}
