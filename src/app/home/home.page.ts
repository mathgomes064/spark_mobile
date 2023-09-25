import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.navCtrl.navigateRoot('');
  }

  public toPropriedade(){
    this.router.navigate(['/propriedade'])
  }

}
