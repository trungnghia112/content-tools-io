import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private notify: NotifyService) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logMessage(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  showError<T>(message, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.logMessage(`${message}`);
      return of(result as T);
    };
  }

  private logMessage(message: string) {
    console.log('log error:', message);
    this.notify.update(message, 'error');
  }
}
