import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideService {
  private showAsideSource = new BehaviorSubject<boolean>(true);
  public showAsideParams$ = this.showAsideSource.asObservable();

  constructor() {
  }

  show() {
    this.showAsideSource.next(true);
  }

  hide() {
    this.showAsideSource.next(false);
  }
}
