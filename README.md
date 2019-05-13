## 说明
0. 下载后:`npm install -g ionic cordova && npm install `
1. 浏览器调试: `ionic serve`
2. 打包成apk: `ionic cordova build android --debug`
3. 数据库插件:
   
```js
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```

4. GPS定位插件 https://ionicframework.com/docs/native/geolocation/ :
   
```js
$ ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
$ npm install --save @ionic-native/geolocation
```


## 如何在两个component共享变量
https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

## 截图
![菜单](screensnap/1.png?raw=true "菜单")

![首页](screensnap/2.png?raw=true "首页")