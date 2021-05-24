import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';
import { AlarmaService } from '../../service/alarma.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  @Input() titulo : string

  constructor(
    private auth : LoginService,
    public route : Router,
    private toast : ToastService,
    private AlarmaService : AlarmaService
    ) {

    }

  ngOnInit() {}

  inicio(){
    this.route.navigate(['../home']);
  }

  fotosSubidas(){
    this.route.navigate(['../home','fotos-subidas']);
  }

  logout(){
    this.auth.logout()
        .then(() => {
          this.AlarmaService.deactivate();
          this.route.navigate(['../login']);
        })
        .catch(() => {
          this.toast.presentToast('Error inesperado');
        });
  }
}
