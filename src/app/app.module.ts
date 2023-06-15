import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from './menu/menu.component'

import { SwiperModule } from 'swiper/angular'

import { AngularFireModule } from '@angular/fire/compat';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import {MatCardModule} from "@angular/material/card";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import { AppRoutingModule } from './app-routing.module';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { OrderComponent } from './order/order.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DialogComponent,
    AdminPanelComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot(),
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatDialogModule,
    SwiperModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDpuvQITJ7KaQTYyjbsthvoFrAoIwB0reU",
      authDomain: "hookah-on-the-go.firebaseapp.com",
      projectId: "hookah-on-the-go",
      storageBucket: "hookah-on-the-go.appspot.com",
      messagingSenderId: "416245062470",
      appId: "1:416245062470:web:43fe1ea84f9334a1d76347",
      measurementId: "G-WEMEZTQV00",
      databaseURL: 'https://hookah-on-the-go-default-rtdb.europe-west1.firebasedatabase.app'
    }),
    MatCardModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [HttpClient, TranslateService, AngularFireDatabase],
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initApp(http: HttpClient, translate: TranslateService, dataBase: AngularFireDatabase) {
  return () => new Promise<boolean>((resolve: (res: boolean) => void) => {

    const defaultLocale = { key: 'gb', value: 1};
    const storageLocale = { key: localStorage.getItem('locale'), value: localStorage.getItem('localeValue')};
    const locale = storageLocale || defaultLocale;

    const translations = dataBase.list(`/translations`);
    translations.valueChanges()
      .subscribe((response: any[]) => {
          const translatedKeys = response[Number(locale.value)];
          const key = String(locale.key);

          translate.setTranslation(key, translatedKeys || {}, true);

          translate.setDefaultLang(defaultLocale.key);
          translate.use(key);

          resolve(true);
        });

  });
}
