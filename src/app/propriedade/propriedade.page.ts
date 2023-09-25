import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropriedadeService } from './services/propriedade.service';
import { Platform, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-propriedade',
  templateUrl: './propriedade.page.html',
  styleUrls: ['./propriedade.page.scss'],
})
export class PropriedadePage implements ViewWillEnter {
  public getPropriedades: any;
  public setPropriedades: any;
  lazyLoadImage = 'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5';

  public navigateHome: any

  constructor(
    private router: Router,
    private propriedadeService: PropriedadeService,
    private platform: Platform,
  ) {

    this.platform.backButton.subscribe(() => {
      this.router.navigate(["/home"])
    });

  }

  ionViewWillEnter(): void {
    this.navigateHome = "/home"
    this.getAllProperties();
  }

  // public async toHome(){
  //   this.router.navigate([]);
  // }

  async getAllProperties() {
    this.propriedadeService.getProperties().subscribe({
       next: async (res: any) => {
          this.setPropriedades = res.map((prop:any) => ({...prop, loaded: false }));
          this.getPropriedades = this.setPropriedades;
       }
    });
 }
 
 onImageLoad() {
  alert('carregou')
}



 
   public async search(value: string){
    const filter = this.setPropriedades.filter((res: any) =>{
      return !res.nome.toLowerCase().indexOf(value.toLowerCase());
    })
    this.getPropriedades = filter;
  }
}
