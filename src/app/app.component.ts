import { Component, ElementRef, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SFXService } from './service/sfx.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  routerHidden = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private SFXService : SFXService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.SFXService.preload('armed_alarm','assets/audio/activado.mp3');
    this.SFXService.preload('lock','assets/audio/horizontal.mp3');
    this.SFXService.preload('arriba','assets/audio/vertical.mp3');
    this.SFXService.preload('izquierda','assets/audio/izquierda.mp3');
    this.SFXService.preload('derecha','assets/audio/derecha.mp3');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(4000).subscribe( ()=> this.routerHidden=false);
    })
  }
}
