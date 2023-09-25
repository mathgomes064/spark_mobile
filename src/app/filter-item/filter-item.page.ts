import { Component } from '@angular/core';
import { FilterItemService } from './services/filter-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.page.html',
  styleUrls: ['./filter-item.page.scss'],
})
export class FilterItemPage implements ViewWillEnter {
  public selectedButton:string = 'group';
  public groups:any[] = [];
  public rows: any[] = [];

  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";

  public navigateItens: any

  constructor(
    public filterItemService: FilterItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
    this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];
  }

  ionViewWillEnter() {
    this.navigateItens = `itens/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`
    this.getRows();
    this.getGroups();
  }

  getGroups(){
    this.filterItemService.getGroups().subscribe({
      next: async (result) => {
        this.groups = result
      }
    })
  }

  getRows(){
    this.rows = [
      'Branca',
      'Azul',
      'Verde',
      'Vermelha'
    ]
  }

  toGroup(){
    this.selectedButton = 'group';
  }

  toRow(){
    this.selectedButton = 'row';
  }

  toRouteRow(row:any){
    this.router.navigate([`filter-item/${this.activatedRoute.snapshot.params['prop_id']}/${this.activatedRoute.snapshot.params['edf_id']}/${this.activatedRoute.snapshot.params['compart_id']}/filter-rows/${row}`])
  }

  toTypeGroup(id:string){
    this.router.navigate([`filter-item/${this.activatedRoute.snapshot.params['prop_id']}/${this.activatedRoute.snapshot.params['edf_id']}/${this.activatedRoute.snapshot.params['compart_id']}/filter-groups/${id}`])
  }
}
