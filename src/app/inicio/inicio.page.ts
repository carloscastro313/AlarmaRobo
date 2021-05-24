import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { AlarmaService } from '../service/alarma.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  isLock : boolean = false;
  error : string = ' ';
  clave : string = '';
  claveUsuario : string;
  constructor(
    private AlarmaService : AlarmaService
    ) {
    this.claveUsuario = localStorage.getItem('clave');
  }

  ngOnInit() {

  }


  lock(){
    if(this.isLock){
      if(this.claveUsuario === this.clave){
        this.clave = '';
        this.isLock = !this.isLock;
        this.AlarmaService.deactivate();
      }else{
        this.error = "Invalido";
        setTimeout(() => {
          this.error = " ";
        }, 1000);
      }
    }else{

      this.AlarmaService.activate();
      this.isLock = !this.isLock;
    }
  }
}
