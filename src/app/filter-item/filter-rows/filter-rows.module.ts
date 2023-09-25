import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';

import { FilterRowsPageRoutingModule } from './filter-rows-routing.module';

import { FilterRowsPage } from './filter-rows.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterItemService } from '../services/filter-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EdificiosService } from 'src/app/edificios/services/edificios.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterRowsPageRoutingModule,
    SharedModule
  ],
  declarations: [FilterRowsPage]
})
export class FilterRowsPageModule implements OnInit{
  subtipos: any[] = []
  public currentAnexos: any[] = []
  isModalOpen = false;
  formStruct: any[] = []
  imageBlobs: any[] = []

  formData = {
    quantidade: '',
    descricao: '',
    compartimentoId:'',
    inputs: []
  };

  constructor(
    public filterItemService: FilterItemService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private edificiosService: EdificiosService,
    private router: Router,

  ) { 
 
  }

  ngOnInit() {
    this.getSubTiposGroups()
  }

    
  setOpen(isOpen: boolean, id:any) {
    this.isModalOpen = isOpen;
    this.getModelo(id)
  }

  getSubTiposGroups(){
    this.filterItemService.getByGroup(this.activatedRoute.snapshot.params['group_id']).subscribe({
       next: async (result) => {
        console.log(result)
        this.subtipos = result
       }
    })
  }

  getModelo(id:string){
    this.filterItemService.getById(id).subscribe({
      next: async (result) =>{
        this.formStruct = result.tipoItemAtributo
        this.formStruct?.forEach((item)=>{
          item.valor
        })          
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
  

  

  async handleSubmit() {
    const payload = {
      descricao: this.formData.descricao,
      quantidade: this.formData.quantidade,
      compartimentoId: this.activatedRoute.snapshot.params['compart_id'],
      inputs : this.formStruct
    }

     this.filterItemService.addItem(payload).subscribe({
      next: async (res) => {
        console.log(res)
        await this.sendImages(res.id);
        this.imageBlobs = [];
        this.currentAnexos = [];
        this.setOpen(false, '');
        const toast = await this.toastController.create({
          message: 'Item criado com sucesso.',
          duration: 1500,
          position: 'top',
          color: 'success' 
        });
        await toast.present();
        this.router.navigate(['/itens/'+`${this.activatedRoute.snapshot.params['compart_id']}/`])
        
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Houve algum problema de conexão com a criação do seu item.',
          duration: 1500,
          position: 'top',
          color: 'warning'
        });
        await toast.present();
      }
    })

    
    console.log(payload)

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


}
