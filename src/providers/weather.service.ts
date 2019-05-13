import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Geolocation } from "@ionic-native/geolocation";
import "rxjs/add/operator/map";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
/*
天气服务api
*/
const AK_KEY: string = "";
const WEATHER_URL = "https://free-api.heweather.com/s6/weather/forecast?location=";

@Injectable()
export class WeatherService {
  constructor(public http: Http, private geolocation: Geolocation) { }
  //获取天气
  getCurrentWeather(longitude: number, latitude: number): Observable<any> {
    let url = WEATHER_URL + longitude + "," + latitude + "&key=" + AK_KEY;
    return this.http.get(url).map(res => res.json());
  }

  getYourLocation() {
    // geo.coords.longitude
    // geo.coords.latitude
    return this.geolocation.getCurrentPosition();
  }
}
