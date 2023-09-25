import { Component, Input } from '@angular/core';
import { ItensService } from './services/itens.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { item } from '../shared/models/models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NavController, Platform, ViewWillEnter } from '@ionic/angular';
import { DetailCompartimentoPage } from '../detail-compartimento/detail-compartimento.page';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.page.html',
  styleUrls: ['./itens.page.scss'],
})
export class ItensPage implements ViewWillEnter{
  @Input() lobby: boolean | null  = null;
  public currentAnexos: any[] = [];
  public isModalOpen = false;
  public dataDash: any;
  public getItens: any;
  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";

  public navigateDetailCompartimento: any


  constructor(
    private itensService: ItensService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private platform: Platform
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fetchData();
      }
    });
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
    this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];

    this.platform.backButton.subscribe(() => {
      this.isModalOpen = false
      this.setOpen();
    });
    
   }

 async ionViewWillEnter() {
    this.navigateDetailCompartimento = `detail-compartimento/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`
    this.getAllItens()
  }

  async getAllItens(){
    let id = this.activatedRoute.snapshot.params['compart_id'];
    this.itensService.getAllItens(id).subscribe({
      next: async (res: any) =>{
        this.getItens = res.item
        this.dataDash = res
      }
    })
  }

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  async fetchData() {
    let id = this.activatedRoute.snapshot.params['compart_id'];
    this.itensService.getAllItens(id).subscribe({
      next: async (res: any) => {
        this.getItens = res.item;
      }
    });
  }

  toDetails(id:string){
    this.router.navigate([`detail-item/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}/${id}`])
  }

  itemForm!: FormGroup;
  public createItemForm(register: item){
    this.itemForm = this.formBuilder.group({
      descricao: [register.descricao, [Validators.required]],
      quantidade: [register.quantidade, [Validators.required]],
      compartimentoId: [register.compartimento_id, [Validators.required]],
      tipo_item_id: [register.tipoItem_id, [Validators.required]]
    })
  }

  toFilter() {
    this.router.navigate([`filter-item/${this.activatedRoute.snapshot.params['prop_id']}/${this.activatedRoute.snapshot.params['edf_id']}/${this.activatedRoute.snapshot.params['compart_id']}`])
  }
}
