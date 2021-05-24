import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SFXService {

  audioType: string = 'native';
  audio : HTMLAudioElement = new Audio();
  sounds: any = [];


  constructor(public nativeAudio: NativeAudio, platform: Platform) {
    console.log(this.sounds);
  }

  preload(key, asset) {

      if(this.audioType === 'html5'){

          let audio = {
              key: key,
              asset: asset,
              type: 'html5'
          };

          this.sounds.push(audio);

      } else {

          this.nativeAudio.preloadSimple(key, asset);

          let audio = {
              key: key,
              asset: key,
              type: 'native'
          };

          this.sounds.push(audio);
      }

  }

  play(key){
    console.log(this.sounds);
      let audio = this.sounds.find((sound) => {
          return sound.key === key;
      });

      if(audio.type === 'html5'){

          this.audio.src = audio.asset;
          this.audio.play().catch(console.log);

      } else {

          this.nativeAudio.play(audio.asset).then((res) => {
              console.log(res);
          }, (err) => {
              console.log(err);
          });

      }

  }

  stop(key){

    let audio = this.sounds.find((sound) => {
        return sound.key === key;
    });
    // this.audio.pause();
    // if(audio.type === 'html5'){



    // } else {

        this.nativeAudio.stop(audio.asset).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });

    // }

}
}
