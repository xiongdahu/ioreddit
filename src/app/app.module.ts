import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

//service deps
import { HttpModule } from "@angular/http";
import { Geolocation } from "@ionic-native/geolocation";
//service components
import { RedditService } from "../providers/reddit.service";
import { WeatherService } from "../providers/weather.service";

import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    //本模块的components
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RedditService, //在module声明的服务是单例的,也是必需的,在component声明的服务是prototype的,如果没有在component声明则使用单例的
    WeatherService,
    Geolocation
  ]
})
export class AppModule {}
