export const Constants = {
  pagination: {
    perPage: 20
  },
  api: {
    login: '/login'
  },
  message: {
    emptyMessage: 'No Data'
  },
  redirectUrl: '/articles',
  loginUrl: '/auth/login',

  asideMenu: [
    {
      label: 'Dashboard',
      icon: 'flaticon2-protection text-primary',
      state: {roles: 'admin'},
      routerLink: '/dashboard'
    },
    {
      label: 'Articles',
      icon: 'flaticon2-crisp-icons text-primary',
      routerLink: '/articles'
    },
    {
      label: 'Accounts',
      icon: 'flaticon2-user-1 text-primary',
      state: {roles: 'admin'},
      routerLink: '/accounts',
    },
    {
      label: 'Settings',
      icon: 'flaticon2-gear text-primary',
      state: {roles: 'admin'},
      routerLink: '/settings',
    },
    {
      label: 'Admin',
      icon: 'flaticon2-cube text-pink',
      state: {roles: 'admin'},
      items: [
        {
          label: 'Crawl',
          routerLink: '/admin/crawl',
          routerLinkActiveOptions: {exact: true}
        },
        {
          label: 'Themes',
          routerLink: '/admin/themes',
          routerLinkActiveOptions: {exact: true}
        }
      ]
    },
    // {
    //   label: 'Generator',
    //   icon: 'flaticon2-cube text-pink',
    //   // state: { roles: 'admin' },
    //   items: [
    //     {
    //       label: 'News',
    //       routerLink: '/generator/news',
    //       routerLinkActiveOptions: {exact: true}
    //     },
    //     {
    //       label: 'Settings',
    //       routerLink: '/generator/settings',
    //       routerLinkActiveOptions: {exact: true}
    //     }
    //   ]
    // }
  ],

  currencies: [
    {label: 'USD', value: 'USD'}
  ],

  table: {
    rows: 20,
    rowsPerPageOptions: [10, 20, 50, 100]
  }
};

export const ROUTES: any[] = [
  ...Constants.asideMenu
];

export const FacebookConstants = {
  api: 'https://graph.facebook.com',
  version: 'v6.0',
  reactions: [
    // {label: 'none', value: 'NONE'},
    {label: 'like', value: 'LIKE'},
    {label: 'love', value: 'LOVE'},
    {label: 'wow', value: 'WOW'},
    {label: 'haha', value: 'HAHA'},
    {label: 'sad', value: 'SAD'},
    {label: 'angry', value: 'ANGRY'}
    // {label: 'thankful', value: 'THANKFUL'},
    // {label: 'pride', value: 'PRIDE'}
  ],
  fields: {
    fullPost: [
      'full_picture',
      'picture',
      'description',
      'from',
      'story',
      'type',
      'privacy',
      'with_tags',
      'story_tags',
      'link',
      'name',
      'object_id',
      'likes',
      'comments',
      'message'
    ]
  },
  LOCAL_STORAGE_ACCESS_TOKEN: 'facebook-accessToken'
};
export const TelegramConstants = {
  api: 'https://api.telegram.org'
};

export const GoogleConstants = {
  drive: {
    api: 'https://www.googleapis.com/drive',
    version: 'v3',
    SESSION_STORAGE_KEY: 'google-drive-accessToken',
    MIME_TYPE_FOLDER: 'application/vnd.google-apps.folder'
  }
};
