import { Component, Input, OnInit, HostListener} from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private router: Router,
  ) {}

  openMenu() {
    // Open the menu by menu-id
    this.menuCtrl.enable(true, 'first-menu');
    this.menuCtrl.open('first-menu');
  }



  goExit() {
    localStorage.clear();
    this.modalCtrl.dismiss() 
    this.menuCtrl.close()
    setTimeout(()=>{
      this.router.navigate(['login']);
    }, 500)
  }

  isNotLoginOrRegister(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login' && currentUrl !== '/register';
}



}
