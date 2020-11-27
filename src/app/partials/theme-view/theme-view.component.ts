import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { clone } from 'lodash-es';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-view',
  templateUrl: './theme-view.component.html',
  styleUrls: ['./theme-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() post: any;
  @Input() theme: any;
  @Input() brand: any;
  @Input() mode: 'view' | 'edit' | 'default' = 'default';
  @Input() showActions: boolean;
  cssVar: any;
  css: any;
  imageUrl: string;
  htmlContent: string;

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

  constructor(private sanitizer: DomSanitizer,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.theme) {
      const theme = this.convertStyle(clone(this.theme));
      const sanitizerData = Object.entries(theme);
      const sanitizer = sanitizerData.map(v => {
        return `--${v[0]}: ${v[1]}`;
      });
      this.cssVar = this.sanitizer.bypassSecurityTrustStyle(sanitizer.join(';'));

      this.addStyle();
    }
    if (this.post) {
      this.imageUrl = this.post.images[0];
      this.htmlContent = this.post.paragraphs.map(p => {
        return `<p>${p}</p>`;
      }).join('<p><br></p>');
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    const styleExits = this.document.getElementById('style-theme-css');
    if (styleExits) {
      styleExits.remove();
    }
  }


  convertStyle(theme) {
    if (theme.template_css) {
      this.css = theme.template_css;
      delete theme.template_css;
    }
    return {
      ...theme,
      template_padding: theme.template_padding + 'px',
      headline_bold: theme.headline_bold ? 'bold' : 'normal',
      headline_italic: theme.headline_italic ? 'italic' : 'normal',
      headline_underline: theme.headline_underline ? 'underline' : 'none',
      headline_font_size: theme.headline_font_size + 'px',
      text_bold: theme.text_bold ? 'bold' : 'normal',
      text_italic: theme.text_italic ? 'italic' : 'normal',
      text_underline: theme.text_underline ? 'underline' : 'none',
      text_font_size: theme.text_font_size + 'px',
      image_ratio: (theme.image_ratio_height / theme.image_ratio_width * 100) + '%'
    };
  }

  private addStyle() {
    let styleExits: any = this.document.getElementById('style-theme-css');
    if (!styleExits) {
      styleExits = this.document.createElement('style');
      styleExits.id = 'style-theme-css';
      this.document.head.appendChild(styleExits);
    }
    styleExits.innerHTML = this.css;
  }
}
