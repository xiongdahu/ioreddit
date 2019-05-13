import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { Storage } from "@ionic/storage";

/**
 * reddit看板新闻服务
 */
const SUBREDDITS = "subreddits";
const REDDIT_URL = "https://www.reddit.com/r/";
const REDDIT_JSON_SUFFIX = "/hot/.json?limit=";
@Injectable()
export class RedditService {
  constructor(public http: Http, public storage: Storage) { }

  private defaultSubs: string[] = [
    "programming",
    "scala",
    "java",
    "nginx",
    "mysql",
    "redis",
    "git",
    "python",
    "clojure"
  ];

  //get post from all subs
  getPosts(subs: string[], loadCount: number) {
    return Observable.forkJoin(
      subs.map(i =>
        this.http
          .get(REDDIT_URL + i + REDDIT_JSON_SUFFIX + loadCount)
          .map(res => res.json())
      )
    );
  }
  //init save
  initStore() {
    return this.storage.set(SUBREDDITS, this.defaultSubs);
  }

  getCurrentSubs() {
    return this.storage.get(SUBREDDITS).then(data => {
      console.log("第一次被调用,数据库为null: " + data);
      if (data == null) {
        this.initStore();
        return this.defaultSubs;
      } else {
        return data;
      }
    });
  }

  removeSub(r: string): Promise<string[]> {
    return this.storage.get(SUBREDDITS).then(data => {
      if (data == null) {
        return [];
      } else {
        var index = data.indexOf(r, 0);
        if (index > -1) {
          data.splice(index, 1);
          this.storage.set(SUBREDDITS, data);
          return data;
        }
      }
    });
  }

  addSub(r: string): Promise<string[]> {
    if (r == null || r == "") {
      return this.getCurrentSubs();
    }
    return this.storage.get(SUBREDDITS).then(data => {
      if (data == null || data == []) {
        data = [];
        data.push(r);
        this.storage.set(SUBREDDITS, data);
        return data;
      } else {
        var index = data.indexOf(r, 0);
        if (index < 0) {
          //不存在才保存
          data.push(r);
          this.storage.set(SUBREDDITS, data);
          return data;
        } else {
          return data;
        }
      }
    });
  }

}
