// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const packageJson = require('../../package.json');

export const environment = {
  production: false,
  envName: 'DEV',
  i18nPrefix: '',
  appName: 'Angular Cli Seed',
  appShortName: 'angular',
  appPrefix: 'ACS',
  domain: {
    app: 'http://localhost:4200'
  },
  API: 'http://localhost:5001/content-tools-io/us-central1/webApi/api/v1',
  versions: {
    app: packageJson.version
  },
  firebaseConfig: {
    apiKey: 'AIzaSyD3Ghvz4XH6o2RERwY_hYhzDP2ih3TCJno',
    authDomain: 'content-tools-io.firebaseapp.com',
    databaseURL: 'https://content-tools-io.firebaseio.com',
    projectId: 'content-tools-io',
    storageBucket: 'content-tools-io.appspot.com',
    messagingSenderId: '701745843553',
    appId: '1:701745843553:web:a054e296243afeace44920'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
