export const appConfig = {
  facebook: {
    url: 'https://graph.facebook.com',
    graphApiVersion: 'v9.0',
    appID: '903642663422562',
    appSecret: '95b441650445f9fee7338c8454cee4ed',
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
    }
  }
};
