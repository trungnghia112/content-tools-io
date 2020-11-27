import { Component, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import html2canvas from 'html2canvas';
import { clone, findIndex } from 'lodash-es';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AsideService } from '../partials/aside/aside.service';
import { ArticlesService } from '../partials/aside/articles.service';
import { MessageService } from 'primeng/api';
import { FacebookConstants } from '@core/configs/constants';
import { HttpClient } from '@angular/common/http';
import { FacebookService } from '@core/services/facebook.service';
import * as moment from 'moment';
import { ThemeViewComponent } from '../partials/theme-view/theme-view.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialComponent implements OnInit, OnChanges {
  @ViewChild('themeView') themeView: ThemeViewComponent;

  theme: any;
  brand: any = {
    logo: null
  };

  editedIndex: number = null;
  imageList: any[] = [];

  page: any;
  domain: any;

  settings = {
    backgroundColor: '#212121',
    textColor: '#ffffff',
    textDomainColor: '#ffffff',
  };

  logoEl: any = {
    src: null,
    top: 0,
    left: 0,
    width: 120,
  };

  pages$: Observable<any>;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      // [{'header': 1}, {'header': 2}],               // custom button values
      // [{list: 'ordered'}, {list: 'bullet'}],
      // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      // [{indent: '-1'}, {indent: '+1'}],          // outdent/indent
      // [{direction: 'rtl'}],                         // text direction

      // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      // [{'header': [1, 2, 3, 4, 5, 6, false]}],

      [{color: []}, {background: []}],          // dropdown with defaults from theme
      // [{'font': []}],
      [{align: []}],

      ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ]
  };
  isBroadcasting: boolean;
  messageBroadcasting: string;
  defaultMessageBroadcasting: string;

  constructor(private afs: AngularFirestore,
              public asideService: AsideService,
              public articlesService: ArticlesService,
              private messageService: MessageService,
              private http: HttpClient,
              private facebookService: FacebookService) {
    this.pages$ = this.afs.collection('pages').valueChanges({idField: 'id'});
  }


  ngOnInit(): void {

  }

  ngOnChanges(): void {
  }

  // I scroll the given HTML element into view, using smooth scrolling if available.
  scrollIntoView(element: HTMLElement): void {
    // NOTE: The "options" are not available in all browsers.
    try {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    } catch (error) {
      element.scrollIntoView();
    }
  }

  onSaveImage() {
    // The html2canvas library, at the time of this writing, is having trouble
    // generating canvas images if the window is scrolled down. To "fix" this, we
    // need to scroll the user back to the top before we initiate the screenshot.
    // --
    // Read more: https://github.com/niklasvh/html2canvas/issues/1878
    window.scrollTo(0, 0);

    // tslint:disable-next-line:prefer-const
    const target: any = document.querySelector('#html2canvas-el');

    // Generate the screenshot using html2canvas.
    const promise = html2canvas(
      target,
      {
        // loading image when other domain
        allowTaint: true,
        useCORS: true,
        logging: false,
        // The onclone callback gives us access to the cloned DOCUMENT before the
        // screenshot is generated. This gives us the ability to make edits to
        // the DOM that won't affect the original page content. In this case, I
        // am applying a special CSS class that allows me to tweak the padding
        // around the text.
        onclone: (docData: any) => {
          // tslint:disable-next-line:no-non-null-assertion
          // let html2canvasEl = document.querySelector('#html2canvas-el');
          // let img = html2canvasEl.querySelector('.card-news-logo-content img');
          // await this.loadImage(this.brand.logo, img);

          docData.querySelector('#html2canvas-el')!.classList.add('html2canvas');
        }
      }
    );

    promise
      .then(
        (canvas) => {
          // Once the screenshot has been generated (as a canvas element), we
          // can grab the PNG data URI which we can then use to render an IMG
          // tag in the app.

          const imageData = {
            id: Date.now(),
            src: canvas.toDataURL()
          };

          const imageListItem = {
            ...imageData,
            post: this.themeView.post,
            logo: clone(this.logoEl),
            // domain: clone(this.domain),
            page: clone(this.page),
            settings: this.settings
          };

          if (this.editedIndex === null) {
            this.imageList.unshift(imageListItem);
          } else {
            this.imageList[this.editedIndex] = imageListItem;
          }
          console.log(this.imageList);
          // this.canvas.nativeElement.src = canvas.toDataURL();
          // this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          // this.downloadLink.nativeElement.download = 'marble-diagram.png';
          // this.downloadLink.nativeElement.click();
        }
      )
      .catch(
        (error) => {
          console.warn('An error occurred.');
          console.error(error);
        }
      );
  }

  onEdit(item: any) {
    this.logoEl.src = null;
    this.domain = null;
    this.page = null;
    this.editedIndex = findIndex(this.imageList, ['uuid', item.uuid]);
    // this.post = item;
    console.log('item:', item);
    setTimeout(() => {
      this.logoEl = clone(item.logo);
      this.domain = clone(item.domain);
      this.page = clone(item.page);
    }, 300);
  }

  onDelete(item: any) {
    this.imageList = this.imageList.filter((v: any) => v.id !== item.id);
  }

  onSelectPage() {
    console.log(this.page);
    this.theme = this.page.theme || null;
    this.logoEl.src = null;
    this.toDataURL(this.page.logo, async (dataUrl) => {
      this.brand.logo = await this.resizeImage(dataUrl);
    });

    this.defaultMessageBroadcasting = this.getDefaultMessageBroadcasting();
  }

  onSelectLogo(image: string) {
    if (!image) {
      this.logoEl.src = null;
      return;
    }
    this.toDataURL(image, async (dataUrl) => {
      this.logoEl.src = await this.resizeImage(dataUrl);
    });
  }

  toDataURL(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement('canvas');
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  }

  // async onSaveTheme() {
  //   await this.afs.collection('pages').doc('cO6PRm2UO9KaCrU1JhP4').update({
  //     theme: {
  //       ...this.theme
  //     }
  //   });
  // }

  async onBroadcast() {
    this.isBroadcasting = true;
    const attached_media = [];
    const photoIds = [];

    const photosPromises = this.imageList.map(async (image: any) => {
        console.log('imageList-item:', image);

        let blob;
        try {
          blob = await this.dataURItoBlob(image.src);
        } catch (e) {
          console.log(e);
        }

        const fd = new FormData();
        fd.append('source', blob);
        fd.append('caption', image.post.excerpt || image.post.headline || '');
        fd.append('published', 'false');
        try {
          const url = `${FacebookConstants.api}/me/photos?access_token=${image.page.access_token}`;
          const dataFb: any = await this.http.post(url, fd).toPromise();
          console.log(dataFb);
          if (dataFb) {
            this.messageService.add({severity: 'success', summary: '', detail: `'${image.post.title}' has already uploaded to Facebook`});
            photoIds.push(dataFb.id);
            attached_media.push(
              {media_fbid: dataFb.id}
            );
          }
        } catch (e) {
          this.messageService.add({severity: 'error', summary: '', detail: e});
          console.log(e);
        }
      }
    );
    await Promise.all(photosPromises);
    console.log(attached_media);

    // postToFacebook
    this.postToFacebook(attached_media);

    // post other chanel

    // end Broadcasting
    this.isBroadcasting = false;
  }

  async postToFacebook(attached_media: { media_fbid: string }[]) {
    try {
      const urlFeed = `${FacebookConstants.api}/me/feed?access_token=${this.page.access_token}`;
      const postRes = await this.http.post(urlFeed, {
        message: this.messageBroadcasting,
        attached_media
      }).toPromise();
      console.log(postRes);
      this.messageService.add({severity: 'success', summary: '', detail: `Post to Facebook feed successfully`});
    } catch (e) {
      this.messageService.add({severity: 'error', summary: '', detail: e});
    }
  }

  // Convert a data URI to blob
  private async dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
      type: 'image/png'
    });
  }

  private getDefaultMessageBroadcasting() {
    const now = moment(); // add this 2 of 4
    // console.log('hello world', now.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    // const dayOfWeek = now.format('dddd');
    // const message = `📣 ĐIỂM TIN BUỔI ${this.isDay() ? 'SÁNG' : 'TỐI'} ${dayOfWeek.toUpperCase()}`;
    const message = `Cập nhật những tin tức ${this.isDay() ? 'đầu' : 'cuối'} ngày cùng ${this.page.name}`;
    // console.log(message);
    return message;
  }

  private isDay() {
    const hours = (new Date()).getHours();
    return (hours >= 6 && hours < 18);
  }
}
