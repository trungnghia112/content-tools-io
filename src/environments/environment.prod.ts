const packageJson = require('../../package.json');

export const environment = {
  production: true,
  envName: 'PROD',
  i18nPrefix: '',
  appName: 'Angular Cli Seed',
  appShortName: 'angular',
  appPrefix: 'ACS',
  domain: {
    app: 'http://localhost:4200'
  },
  API: 'https://us-central1-firetools-io.cloudfunctions.net/webApi/api/v1',
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
