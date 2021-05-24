import { Injectable } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SoundService } from '../service/sound.service';
import { SFXService } from '../service/sfx.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {
  motionActive;
  flagFlash : boolean = true;
  flagVibra : boolean = true;
  flagLeft : boolean = true;
  flagRight : boolean = true;
  audio: HTMLAudioElement;
  x;
  y;
  z;
  constructor(
    private motion : DeviceMotion,
    private flashlight : Flashlight,
    private SFXService : SFXService,
    private vibration : Vibration
    ) { }
  isActive(){

    let option : DeviceMotionAccelerometerOptions ={
      frequency: 100,
    };
    try {
      this.motionActive = this.motion.watchAcceleration(option).subscribe((acc :DeviceMotionAccelerationData)=>{

        this.x = acc.x;
        this.y = acc.y;
        this.z = acc.z;
          if(acc.y <= -3 && this.flagVibra == true){
            this.flagVibra = false;
            this.SFXService.play('lock');
            this.vibration.vibrate(5000);
            setTimeout(() => {
              this.SFXService.stop('lock');
              this.vibration.vibrate(0);
            }, 5000);
          }else if(acc.y >= -1 && this.flagVibra == false){
            this.flagVibra = true;
            this.vibration.vibrate(0);
          }

          if(acc.y>= 3 && this.flagFlash == true){
            this.flagFlash = false;
            this.SFXService.play('arriba');
            this.flashlight.switchOn();
            setTimeout(() => {
              this.SFXService.stop('arriba');
              this.flashlight.switchOff();
            }, 5000);
          }else if(acc.y<= 1 && this.flagFlash == false){
            this.flagFlash = true;
            this.flashlight.switchOff();
          }

          if(acc.x >= 5 && this.flagRight == true){
            this.SFXService.play('derecha');
            this.flagRight = false;
          }else if(acc.x <= 3 && this.flagRight  == false){
            this.flagRight = true;
            this.SFXService.stop('derecha');
          }

          if(acc.x <= -5 && this.flagLeft == true){
            this.flagLeft = false;
            this.SFXService.play('izquierda');
          }else if(acc.x >= -3 && this.flagLeft == false){
            this.flagLeft = true;
            this.SFXService.stop('izquierda');
          }
        });
    } catch (error) {
    }

  }

  deactivate(){
    this.motionActive.unsubscribe();
    this.vibration.vibrate(0);
    this.flashlight.switchOff();
  }

  activate(){
    this.SFXService.play('armed_alarm');
    this.vibration.vibrate([200,0,200,0]);
    this.isActive();
  }
}
