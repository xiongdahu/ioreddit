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
$ ionic cordova plugin add cordova-plugin-geolocation
$ npm install --save @ionic-native/geolocation
```

5. 添加浏览器
```js
cordova plugin add cordova-plugin-inappbrowser@latest --save
npm install -- save @ionic-native/in-app-browser
```
6. 修改浏览器user-agent
```js
ionic cordova plugin add cordova-plugin-useragent
npm install @ionic-native/user-agent
```

## 如何在两个component共享变量
https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

## 截图
![菜单](screensnap/1.png?raw=true "菜单")

![首页](screensnap/2.png?raw=true "首页")