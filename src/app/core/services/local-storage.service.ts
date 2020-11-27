import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  appNamePrefix: string;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.appNamePrefix = `${environment.appPrefix}-`;

    if (isPlatformBrowser(this.platformId)) {
      // localStorage will be available: we can use it.
    }
    if (isPlatformServer(this.platformId)) {
      // localStorage will be null.
    }
  }

  loadInitialState() {
    if (isPlatformBrowser(this.platformId)) {
      return Object.keys(localStorage).reduce((state: any, storageKey) => {
        if (storageKey.includes(this.appNamePrefix)) {
          state = state || {};
          const stateKey = storageKey
            .replace(this.appNamePrefix, '')
            .toLowerCase()
            .split('.');
          let currentStateRef = state;
          stateKey.forEach((key, index) => {
            if (index === stateKey.length - 1) {
              currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
              return;
            }
            currentStateRef[key] = currentStateRef[key] || {};
            currentStateRef = currentStateRef[key];
          });
        }
        return state;
      }, undefined);
    } else {
      return null;
    }
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`${this.appNamePrefix}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(`${this.appNamePrefix}${key}`));
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(`${this.appNamePrefix}${key}`);
    }
  }
}
