import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ArticlesConstants } from './articles-constants';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  apiUrl = 'https://try.readme.io/https://api.newswhip.com/v1/fbPosts?key=DevKey';

  private bodyParamsSource = new BehaviorSubject<any>(null);
  public bodyParams$ = this.bodyParamsSource.asObservable();

  private currentPostSource = new BehaviorSubject<any>(null);
  public currentPost$ = this.currentPostSource.asObservable();

  constructor(private http: HttpClient,
              private afs: AngularFirestore,
              private api: ApiService,
              private localStorageService: LocalStorageService) {
    let bodyParams = ArticlesConstants.bodyParamsDefault;
    if (this.localStorageService.getItem('fbposts-filters')) {
      bodyParams = JSON.parse(this.localStorageService.getItem('fbposts-filters'));
    }
    this.bodyParamsSource.next(bodyParams);
  }

  getFbPosts(body = null) {
    if (body) {
      this.bodyParamsSource.next(body);
    }
    this.updateFilterByDate();
    this.saveFilter();

    const bodyParams = this.bodyParamsSource.getValue();

    return this.http.post(this.apiUrl, bodyParams)
      .pipe(
        map((res: any) => res.fbPosts)
      );
  }

  saveCurrentPost(item) {
    console.log('saveCurrentPost:', item);
    this.currentPostSource.next(item);
  }

  fetchDomains() {
    return this.afs.collection('crawl').valueChanges({idField: 'id'});
  }

  checkDomainExist(domain) {
    return this.afs.doc(`crawl/${domain}`).valueChanges();
  }

  crawl(body: any) {
    return this.api.post(`/crawl`, body);
  }

  getLanguages() {
    return this.http.get('/assets/data/language-codes.json')
      .pipe(
        map((res: any) => {
          return res.map(v => {
            return {
              ...v,
              label: v.English,
              value: v.alpha2,
            };
          });
        })
      );
  }

  getCountries() {
    return this.http.get('/assets/data/countries.json')
      .pipe(
        map((res: any) => res.data)
      );
  }

  saveFilter() {
    const bodyParams = this.bodyParamsSource.getValue();

    this.localStorageService.setItem('fbposts-filters', JSON.stringify({
      ...bodyParams,
      from: null,
      to: null,
      fromDate: null,
      toDate: null
    }));
  }

  resetFilter() {
    this.bodyParamsSource.next(ArticlesConstants.bodyParamsDefault);
    this.saveFilter();
  }

  private updateFilterByDate() {
    const bodyParams = this.bodyParamsSource.getValue();
    let from: any;
    let to: any = moment();
    switch (bodyParams.filterByDate) {
      case 'custom':
        from = moment().subtract(1, 'd');
        if (bodyParams.fromDate) {
          from = moment(bodyParams.fromDate);
        }
        if (bodyParams.toDate) {
          to = moment(bodyParams.toDate);
        }
        break;
      case '30-minute':
        from = moment().subtract(30, 'minutes');
        break;
      case '1-hour':
        from = moment().subtract(1, 'hours');
        break;
      case '3-hour':
        from = moment().subtract(3, 'hours');
        break;
      case '6-hour':
        from = moment().subtract(6, 'hours');
        break;
      case '12-hour':
        from = moment().subtract(12, 'hours');
        break;
      case 'hour':
        from = moment().subtract(1, 'd');
        break;
      case 'week':
        from = moment().subtract(7, 'd');
        break;
      case 'month':
        from = moment().subtract(1, 'M');
        break;
      case '3-month':
        from = moment().subtract(3, 'M');
        break;
      case '6-month':
        from = moment().subtract(6, 'M');
        break;
      case 'year':
        from = moment().subtract(1, 'y');
        break;
      default:
        break;
    }

    bodyParams.from = from.toDate().getTime();
    bodyParams.to = to.toDate().getTime();

    this.bodyParamsSource.next(bodyParams);
  }
}
