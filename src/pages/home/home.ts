import { RedditService } from "../../providers/reddit.service";
import { WeatherService } from "../../providers/weather.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [WeatherService]
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public http: Http,
    private weatherService: WeatherService,
    private redditService: RedditService
  ) { }

  //是否加载完成,控制骨架图
  loaded: any = false;
  fakePosts = Array(15);
  //新闻集合
  posts = Array();
  //天气预报字段
  weather: string;

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
    this.getWeather();
    this.posts = [];
    this.loadPosts();
  }

  //获取天气
  getWeather() {
    this.weatherService.getYourLocation().then(
      geo => {
        // geo.coords.longitude, geo.coords.latitude
        this.weatherService
          .getCurrentWeather(geo.coords.longitude, geo.coords.latitude)
          .subscribe(json => {
            let basic = json.HeWeather6[0].basic;
            let city = basic.location;

            let forecast = json.HeWeather6[0].daily_forecast[0];
            //温度:tmp,天气:cond_txt,风向:wind_dir,风速:wind_spd,降水量:pcpn
            this.weather =
              `${city} 白天:${forecast.cond_txt_d} 夜间:${forecast.cond_txt_n} 温度:${forecast.tmp_min}℃-${forecast.tmp_min}℃`;
          });
      },
      err => { }
    );
  }

  //加载reddits posts
  loadPosts() {
    this.redditService.getCurrentSubs().then(data => {
      this.redditService.getPosts(data, 10).subscribe(responses => {
        responses.forEach(res => {
          res.data.children.map(item => this.posts.push(item));
          this.posts.sort((a, b) => {
            return b.data.num_comments - a.data.num_comments;
          });
          this.loaded = true;
        });
      });
    });
  }

  doRefresh(refresher) {
    this.posts = Array();
    this.getWeather();
    this.loadPosts();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  //加载更多
  loadMore(infiniteScroll) {
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      infiniteScroll.complete();
    }, 500);
  }
}
