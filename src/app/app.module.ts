import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { SocialComponent } from './social/social.component';
import { DropdownModule } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { ThemeViewModule } from './partials/theme-view/theme-view.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedAppModule } from '@shared/shared.module';
import { AsideModule } from './partials/aside/aside.module';
import { ImgResizableModule } from './partials/img-resizable/img-resizable.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    NoopAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    SharedAppModule,
    DropdownModule,
    ColorPickerModule,
    NgbDropdownModule,
    QuillModule.forRoot(),
    ThemeViewModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AsideModule,
    ImgResizableModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
