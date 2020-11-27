// <div *ngFor="let item of list | groupByMap:'group_by':'asc':'first_name':'asc'">
//  <span>{{ item.key }}</span>
//  <ul>
//    <li *ngFor="let obj of item.value">
//    </li>
//  </ul>
// </div>

/*import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'groupByMap'
})
export class GroupByMapPipe implements PipeTransform {

  transform(value: any, objectKey?: any, orderBy?: string, objectKeyIn?: any, orderByIn?: string): any {
    const result = _.chain(value)
      .groupBy(objectKey)
      .map((v, k) => {
        return { key: k, value: _.orderBy(v, [objectKeyIn], [orderByIn]) };
      })
      .value();
    return _.orderBy(result, ['key'], [orderBy]);
  }

}*/
