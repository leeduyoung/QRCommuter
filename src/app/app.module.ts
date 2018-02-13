import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Toast } from '@ionic-native/toast';

import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { QrscannerPage } from '../pages/qrscanner/qrscanner';
import { LoaderProvider } from '../providers/loader/loader';
import { HttpProvider } from '../providers/http/http.service';
import { Url } from '../providers/http/url';
import { GlobalsProvider } from '../providers/globals';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    QrscannerPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          backButtonText: ''
        } 
      }
    }),
    RoundProgressModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    QrscannerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider,
    HttpProvider,
    Url,
    GlobalsProvider
  ]
})
export class AppModule {}
