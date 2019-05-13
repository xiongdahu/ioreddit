import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AlertController, ToastController } from "ionic-angular";
import { HomePage } from "../pages/home/home";
//service
import { RedditService } from "../providers/reddit.service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any }>;

  //current subs
  currSubs: string[];
  // input form for new subreddit
  newSub = "";

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public redditService: RedditService
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [{ title: "Home", component: HomePage }];
    //load all subscribed subreddits
    this.currentSubs();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  currentSubs() {
    this.redditService.getCurrentSubs().then(data => {
      this.currSubs = data;
    });
  }

  removeSub(r: string): void {
    this.redditService.removeSub(r).then(data => {
      this.currSubs = data;
    });
  }

  addSub() {
    this.redditService.addSub(this.newSub).then(data => {
      this.currSubs = data;
    });
    this.newSub = "";
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "看板添加成功,刷新一下吧",
      duration: 1000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }

  resetSubs() {
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "确认重置?",
      message: "会恢复到默认订阅的看板",
      buttons: [
        {
          text: "取消",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "重置",
          handler: () => {
            this.redditService.initStore().then(data => {
              this.currSubs = data;
            });
          }
        }
      ]
    });
    alert.present();
  }
}
