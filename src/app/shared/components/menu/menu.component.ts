import { Component, Input, OnInit, HostListener} from '@angular/core';
import { MenuController } from '@ionic/angular';
import {  Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() public currentBackNavigation: any
  isMenuOpen = false; // Variável para controlar o estado do menu

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    ) {}

  @Input() lobby: boolean | null  = null;

  async ngOnInit(
  ) {
  }

  async goBack() {
    console.log(await this.menuCtrl.close())

    this.router.navigate([this.currentBackNavigation]);
  }



  goExit() {
    localStorage.clear();
    
    this.router.navigate(['login']);
  }


  openMenu() {
    alert('sdhsjahdlsjka')
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.querySelector('.menu') as HTMLElement;

    // Abre ou fecha o menu com base no estado atual
    if (this.isMenuOpen) {
      menu.style.left = '0px';
    } else {
      menu.style.left = '-250px'; // Volta a esconder o menu fora da tela
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const menu = document.querySelector('.menu') as HTMLElement;
    menu.style.left = '-250px';
  }


}
