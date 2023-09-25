import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailService } from '../detail-compartimento/services/detail.service';
import { FilterItemService } from '../filter-item/services/filter-item.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ItensService } from '../itens/services/itens.service';
import { MessageService } from 'primeng/api';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { EdificiosService } from '../edificios/services/edificios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.page.html',
  styleUrls: ['./detail-item.page.scss'],
  providers: [MessageService]
})

export class DetailItemPage implements ViewWillEnter {
  public currentAnexos: any = [];
  public item: any | null = null;
  public imageBlobs:any[] = [];
  public atributos:any = [];
  public tipoAtributos:any = [];
  public novosValores:any[] = [];
  
  // Change type of item
  public isModalOpen = false;
  public formStruct: any[] = [];

  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";

  public navigateItem: any

  formData = {
    quantidade: '',
    descricao: '',
    itemId:'',
    inputs: []
  };

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public detailService: DetailService,
    public filterItemService: FilterItemService,
    public itensService: ItensService,
    private toastController: ToastController,
    private edificiosService: EdificiosService,
    private platform: Platform
    ) {
      this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
      this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
      this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];

      this.platform.backButton.subscribe(() => {
        this.setOpen(false);
      });
    }

  public oldItemValor: any[] = []
  ionViewWillEnter() {
    this.navigateItem = `itens/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`

    this.getItemId();
    this.listAnexosById(this.activatedRoute.snapshot.params['item_id']);

    this.itensService.getItemById(this.activatedRoute.snapshot.params['item_id']).subscribe({
      next: async (res: any) => {
        this.oldItemValor = res.itemAtributos.flatMap((objeto: any) => objeto.itemValor);
      }
    })
  }

  // public getItemById(item_id: string){
  //   return this.http.get<any>(`${environment.BASE_URL}/itens/filter/${item_id}`)
  // }

  setOpen(state:boolean) {
    this.tipoAtributos = []
    this.isModalOpen = state;
    this.getModeloEdit();

    this.http.get<any>(`${environment.BASE_URL}/itens/filter/${this.activatedRoute.snapshot.params['item_id']}`)
    .subscribe(
      res => {
        this.oldItemValor = res.itemAtributos.flatMap((objeto: any) => objeto.itemValor)
        this.filtrarTipoItemAtributo(res.tipo_item_id.id)
      }
    )
  }

  getItemId() {
    this.http.get<any>(`${environment.BASE_URL}/itens/${this.activatedRoute.snapshot.params['item_id']}`).subscribe({
      next: async (res) => {      
        this.item = res;
        this.formData.quantidade = res.quantidade;
        this.formData.descricao = res.descricao;
      }
    });
  }
  
  getModeloEdit(){
    this.http.get<any>(`${environment.BASE_URL}/tipoItem/item/${this.activatedRoute.snapshot.params['item_id']}`).subscribe({
      next: async (res: any) => {    
        this.atributos = res.itemAtributos;
        this.tipoAtributos = res.tipoItem.tipoItemAtributo;
        this.buildValues();
      }
    });
  }

  buildValues(){
    this.atributos.forEach((atributo:any,index:number) => {
      const obj = {
          'atributo_id': atributo.itemValor[0].id,
          'atributo_valor': this.oldItemValor[index]?.valor??''
      }
      this.novosValores.push(obj)
    });
  }
 
  listAnexosById(id: string){
    this.detailService.getAnexosById(id).subscribe({
      next: async (res: any) =>{
        this.currentAnexos = res;
      }
    })
  }

  submitEdit(){
    const payload = {
      descricao: this.formData.descricao,
      quantidade: this.formData.quantidade,
      valores: this.novosValores
    }

    const valuesToUpdate = this.oldItemValor.map((item, index) => ({
      id: item.id,
      valor: this.itemAtributoToUpdate[index].valor
    }));

    this.itensService.ItemUpdate(this.activatedRoute.snapshot.params['item_id'], payload).subscribe({
      next: async (res: any) => {
        for (let i = valuesToUpdate.length - 1; i >= 0; i--) {
          if (valuesToUpdate[i].valor === undefined) {
            valuesToUpdate.splice(i, 1);
          }
        }
        
        this.itensService.ItemValueUpdate(valuesToUpdate).subscribe(
          res =>{
            this.getItemId();
          }
        )
        await this.sendImages(this.activatedRoute.snapshot.params['item_id']);
        const toast = await this.toastController.create({
          message: 'Item atualizado com sucesso.',
          duration: 1500,
          position: 'top',
          color: 'success' 
        });
        await toast.present();
        this.getItemId();
        this.setOpen(false);
        this.novosValores = []
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Houve algum problema de conexão com a atualização do item.',
          duration: 1500,
          position: 'top',
          color: 'warning'
        });
        await toast.present();
      }
    })
  }

  public async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        source: CameraSource.Camera,
        width: 1280,
        height: 1280,
        presentationStyle:'popover'
      });
      
  
  
      if (image?.webPath) {
        let blob = await fetch(image.webPath).then(r => r.blob());
  
        const file = new File([blob], "image.png", { type: 'image/png' });
        
        this.imageBlobs.push(file); // Substitua imageBlobs com o nome do array que você está usando
        this.currentAnexos.push({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  async sendImages(id_item: any) {
    const formData = new FormData();
    formData.append("ref", "Item");
    formData.append("id_ref", id_item);
  
    // Anexando todos os blobs ao FormData
    for (let blob of this.imageBlobs) {
      formData.append("files", blob);
    }
  
    this.edificiosService.uploadImage(formData).subscribe({
      next: async (response) => {
        return response
      },
      error: async (error) => {
        return error
      }
    });
  }

  public itemAtributoToUpdate: any[] = []

  filtrarTipoItemAtributo(tipo_item_id: string){
    this.http.get<any>(`${environment.BASE_URL}/tipoItem/${tipo_item_id}`).subscribe(
        res => {
          this.itemAtributoToUpdate = res.tipoItemAtributo
          this.itemAtributoToUpdate.forEach((item, index)=>{
            item.valor = this.oldItemValor[index].valor
          })
        }
      )      
  }
      
}