import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//这个是ionic的启动入口,不是angular的入口.
platformBrowserDynamic().bootstrapModule(AppModule);
