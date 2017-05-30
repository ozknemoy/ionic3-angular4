import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Constart } from './app.component';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { MediaPlugin } from '@ionic-native/media';
import { IonicAudioModule } from 'ionic-audio';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfilePage} from "../pages/profile/profile";
import {ProjectPage} from "../pages/project/project";

import {AudioComponent} from "../audio/audio.component";
import {loginComponent} from "../directives/login/login.component";

@NgModule({
    declarations: [
        AudioComponent,
        Constart,
        AboutPage,
        ProjectPage,
        ContactPage,
        HomePage,
        TabsPage,
        ProfilePage,

        loginComponent,
    ],
    entryComponents: [
        Constart,
        AboutPage,
        ProjectPage,
        ContactPage,
        HomePage,
        TabsPage,
        ProfilePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(Constart),
        HttpModule,
        IonicAudioModule.forRoot(),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    providers: [
        StatusBar,
        SplashScreen,
        //{provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpService,
        MediaPlugin,
        AuthService
    ]
})
export class AppModule {
}
