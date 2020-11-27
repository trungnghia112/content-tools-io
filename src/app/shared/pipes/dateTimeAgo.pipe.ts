import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateTimeAgo'})
export class DateTimeAgoPipe implements PipeTransform {
  transform(value: any): any {
    return moment(value).fromNow();
  }
}
