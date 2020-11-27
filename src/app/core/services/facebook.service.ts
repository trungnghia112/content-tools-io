import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '@core/services/log.service';
import { FacebookConstants } from '@core/configs/constants';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  accessToken: string;

  constructor(private http: HttpClient,
              private logService: LogService) {
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Token
   */
  checkTokenLive(accessToken: string = this.accessToken) {
    return this.http.get<any>(`${FacebookConstants.api}/me?access_token=${accessToken}`)
      .pipe(
        catchError(this.logService.showError(''))
      );
  }

  /**
   * Profile
   */
  // getProfile(facebookId: string, fields: string = 'name', accessToken: string) {
  //   let url = `/${FacebookConstants.version}/${facebookId}?access_token=${accessToken}`;
  //   if (fields) {
  //     url = url + `&fields=${fields}`;
  //   }
  //   return this.get(url);
  // }

  /**
   * v2.12
   * facebookId
   * fields
   * access_token
   */
  getProfileOld(facebookId: string, fields: string = 'name', accessToken: string = this.accessToken) {
    let url = `${FacebookConstants.api}/v2.12/${facebookId}?access_token=${accessToken}`;
    if (fields) {
      url = url + `&fields=${fields}`;
    }
    return this.http.get(url);
  }


  /**
   * Privacy
   */
  // updatePrivacy(postID: string, privacy: string, access_token: string = this.accessToken) {
  //   const url = `${FacebookConstants.api}/${postID}?access_token=${access_token}`;
  //   return this.http.post(url, {
  //     privacy: {
  //       value: privacy
  //     }
  //   })
  //     .pipe(
  //       delay(800)
  //     );
  // }

  /**
   * Post
   */
  getFeeds(limit = 10, fields: any, profileId = 'me', next: string = null, accessToken: string = this.accessToken) {
    const fieldsStr = Array.isArray(fields) ? fields.toString() : fields;
    let url = `${FacebookConstants.api}/${FacebookConstants.version}/${profileId}/feed?limit=${limit}&access_token=${accessToken}`;
    if (fields) {
      url = url + `&fields=${fieldsStr}`;
    }
    if (next) {
      url = url + `&after=${next}`;
    }
    return this.http.get(url);
  }

  getMyFeeds(fields: string, limit = 10, accessToken: string = this.accessToken) {
    let url = `${FacebookConstants.api}/me/feed?limit=${limit}&access_token=${accessToken}`;
    if (fields) {
      url = url + `&fields=${fields}`;
    }
    return this.http.get(url);
  }

  postMeFeed(body: any, accessToken: string = this.accessToken) {
    const url = `${FacebookConstants.api}/me/feed?access_token=${accessToken}`;
    const data = {
      message: body.message || body.description,
      privacy: {
        value: 'EVERYONE'
      }
    };

    if (body.full_picture) {
      return this.uploadPhotoTemp(body.full_picture)
        .pipe(
          map((res: any) => (res && res.id) ? {...data, attached_media: [{media_fbid: res.id}]} : data),
          switchMap((newData: any) => {
            return this.http.post(url, newData).pipe(
              delay(800)
            );
          })
        );
    } else {
      return this.http.post(url, data).pipe(
        delay(800)
      );
    }
  }

  /**
   * Page liked
   */
  // getPagesLiked(next: string = null, access_token: string = this.accessToken) {
  //   const fields = 'id,name,picture';
  //   let url = `${FacebookConstants.api}/${FacebookConstants.version}/me/likes?fields=${fields}&access_token=${access_token}`;
  //   if (next) {
  //     url = url + `&after=${next}`;
  //   }
  //   return this.http.get(url);
  // }
  //
  // unlikePageLiked(id: any, access_token: string = this.accessToken) {
  //   const url = `${FacebookConstants.api}/${id}/likes?method=delete&access_token=${access_token}`;
  //   return this.http.get(url).pipe(
  //     delay(800)
  //   );
  // }


  /**
   * Friends
   */

  getFriends(fields: string = 'id') {
    /* tslint:disable:max-line-length */
    // const fields = 'id,name,picture,gender,location,hometown,birthday,friends.limit(1)';
    const url = `${FacebookConstants.api}/${FacebookConstants.version}/me/friends?fields=${fields}&limit=5000&access_token=${this.accessToken}`;
    // const url = `${FacebookConstants.api}/v2.12/me/friends?fields=${fields}&limit=5000&access_token=${access_token}`;
    /* tslint:enable:max-line-length */
    return this.http.get(url);
  }

  unFriend(id: string, accessToken: string = this.accessToken) {
    const url = `${FacebookConstants.api}/me/friends/${id}?method=delete&access_token=${accessToken}`;
    return this.http.get(url).pipe(
      delay(800)
    );
  }


  /**
   * Photos
   */

  // tslint:disable:max-line-length
  // {
  // "1149859932011709": {
  //   "name": "...",
  //   "images": [
  //     {
  //       "source": "https://scontent.xx.fbcdn.net/v/t1.0-9/90114102_1149859938678375_4415562358399696896_n.png?_nc_cat=100&_nc_sid=5c7b18&_nc_ohc=6_vv7CrQY3YAX9gmdBh&_nc_ht=scontent.xx&oh=ecf7020066d5fb14095e0e0c60658e8a&oe=5E9C588D"
  //     },
  //     {
  //       "source": "https://scontent.xx.fbcdn.net/v/t1.0-0/p480x480/90114102_1149859938678375_4415562358399696896_n.png?_nc_cat=100&_nc_sid=5c7b18&_nc_ohc=6_vv7CrQY3YAX9gmdBh&_nc_ht=scontent.xx&oh=49dd65be4217288031255741a5e7f780&oe=5E9E9098"
  //     },
  //     {
  //       "source": "https://scontent.xx.fbcdn.net/v/t1.0-0/p320x320/90114102_1149859938678375_4415562358399696896_n.png?_nc_cat=100&_nc_sid=5c7b18&_nc_ohc=6_vv7CrQY3YAX9gmdBh&_nc_ht=scontent.xx&oh=7454917bf104a2f36bfbc3797646ad0c&oe=5E9BF251"
  //     },
  //     {
  //       "source": "https://scontent.xx.fbcdn.net/v/t1.0-0/p130x130/90114102_1149859938678375_4415562358399696896_n.png?_nc_cat=100&_nc_sid=5c7b18&_nc_ohc=6_vv7CrQY3YAX9gmdBh&_nc_ht=scontent.xx&oh=9bb475088c6d97167e65367b7da19710&oe=5E9C7338"
  //     },
  //     {
  //       "source": "https://scontent.xx.fbcdn.net/v/t1.0-0/p75x225/90114102_1149859938678375_4415562358399696896_n.png?_nc_cat=100&_nc_sid=5c7b18&_nc_ohc=6_vv7CrQY3YAX9gmdBh&_nc_ht=scontent.xx&oh=6ecbd4592b457461ab50627e230f0e2a&oe=5E9E0381"
  //     }
  //   ],
  //   "id": "1149859932011709"
  // }
  // tslint:enable:max-line-length
  getPhotosByIds(ids: string[], accessToken: string = this.accessToken) {
    // const url = `${FacebookConstants.api}/?ids=${ids.join()}&fields=name,photos.limit(10){id,images}&access_token=${accessToken}`;
    const url = `${FacebookConstants.api}/?ids=${ids.join()}&fields=name,images{source}&access_token=${accessToken}`;
    return this.http.get(url).pipe(
      delay(800)
    );
  }

  uploadPhotoTemp(urlPhoto: string, accessToken: string = this.accessToken) {
    const url = `${FacebookConstants.api}/me/photos?access_token=${accessToken}`;
    return this.http.post(url, {
      url: urlPhoto,
      published: 'false'
    }).pipe(
      delay(800)
    );
  }

  /**
   * Only use in component
   */
  // uploadPhotoFormDataTemp(imageData: any, accessToken: string = this.accessToken) {
  //   let blob;
  //   try {
  //     blob = this.dataURItoBlob(imageData);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //
  //   const formData = new FormData();
  //   // formData.append('access_token', access_token);
  //   formData.append('source', blob);
  //   formData.append('caption', 'Photo Text');
  //   // formData.append('published', 'false');
  //
  //   const url = `${FacebookConstants.api}/me/photos?access_token=${accessToken}`;
  //   return this.http.post(url, formData)
  //     .pipe(
  //       delay(800)
  //     );
  // }

  /**
   * Albums
   */

  // getAlbums(facebookId: string, accessToken: string) {
  //   const url = `${FacebookConstants.api}/${facebookId}/albums?fields=id,name&limit=100&access_token=${accessToken}`;
  //   return this.http.get(url).pipe(
  //     delay(800)
  //   );
  // }

  getAlbumsWithPhotos(facebookId: string, accessToken: string = this.accessToken) {
    const fields = 'id,name,picture,photo_count,photos{images}';
    const url = `${FacebookConstants.api}/${facebookId}/albums?fields=${fields}&limit=100&access_token=${accessToken}`;
    return this.http.get(url).pipe(
      delay(800)
    );
  }

  // getPhotosByAlbum(albumId: string, accessToken: string = this.accessToken) {
  //   const url = `${FacebookConstants.api}/${albumId}/photos?fields=images.source&limit=100&access_token=${accessToken}`;
  //   return this.http.get(url).pipe(
  //     delay(800)
  //   );
  // }

  /**
   * Tools
   */

  profilePictureGuard(facebookId: string, isShielded: boolean = true) {
    const url = `https://graph.facebook.com/graphql`;
    const options = {};
    // const options = {
    //   headers: {
    //     Authorization: 'OAuth ' + this.auth.currentUser.accessToken
    //   }
    // };
    const clientMutationId = 'b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0';
    return this.http.post(url, {
      variables: `{"0":{"is_shielded":${isShielded},"actor_id":"${facebookId}","client_mutation_id":"${clientMutationId}"}}`,
      doc_id: '1477043292367183'
    }, options);
  }

  /**
   * Reactions
   */

  postReaction(postID: string, react: string, accessToken: string = this.accessToken) {
    const url = `${FacebookConstants.api}/${FacebookConstants.version}/${postID}/reactions?type=${react}&access_token=${accessToken}`;
    return this.http.post(url, {}).pipe(
      delay(1200)
    );
  }

  getReaction(id: string, limit: number, accessToken: string = this.accessToken) {
    let url = `${FacebookConstants.api}/${FacebookConstants.version}/${id}`;
    url = url + `?fields=reactions.limit(${limit}).summary(true)&access_token=${accessToken}`;
    return this.http.get(url);
  }

  getComment(id: string, limit: number, accessToken: string = this.accessToken) {
    const url = `${FacebookConstants.api}/${id}?fields=comments.limit(${limit}).summary(true)&access_token=${accessToken}`;
    return this.http.get(url);
  }

  // Convert a data URI to blob
  /*dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
      type: 'image/png'
    });
  }*/
}
