import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPropriedadeService } from './services/detail-propriedade.service';
import { environment } from 'src/environments/environment';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-detail-propriedade',
  templateUrl: './detail-propriedade.page.html',
  styleUrls: ['./detail-propriedade.page.scss'],
})
export class DetailPropriedadePage implements ViewWillEnter {
  public getDetailPropriedades: any;
  public currentAnexos: any;

  public navigatePropriedade: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private detailPropriedadeService: DetailPropriedadeService,
    private router: Router,
  ) { }

  public propriedadeIdToUpdate: any;

  ionViewWillEnter() {
    this.navigatePropriedade = "/propriedade"
    this.propriedadeIdToUpdate = this.activatedRoute.snapshot.params['prop_id'];

    this.getDetailPropriedade();

    this.detailPropriedadeService.getAnexosById(`${environment.BASE_URL}/edificio/anexos/${this.propriedadeIdToUpdate}`).subscribe({
      next: async (res: any) =>{
        this.currentAnexos = res
      }
    })
  }

  getDetailPropriedade(){
    this.detailPropriedadeService.getPropriedadeById(`${environment.BASE_URL}/propriedade/${this.propriedadeIdToUpdate}`).subscribe({
      next: async (res: any) => {
        this.getDetailPropriedades = res
      }
    })
  }

  slideOpts = {
    initialSlide: 1,
    speed: 1280,
  };

  public toProperties(){
    this.router.navigate(['/propriedade']);
  }

  public toBuilding() {
    this.router.navigate(['/edificios/' + this.activatedRoute.snapshot.params['prop_id']]);
  }
}
