import { Component } from '@angular/core';
import { FilterItemService } from '../services/filter-item.service';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { EdificiosService } from 'src/app/edificios/services/edificios.service';

@Component({
  selector: 'app-filter-rows',
  templateUrl: './filter-rows.page.html',
  styleUrls: ['./filter-rows.page.scss'],
  providers: [MessageService]

})
export class FilterRowsPage implements ViewWillEnter {
  public isModalOpen = false;
  public currentAnexos: any[] = [];
  public formStruct: any[] = [];
  public imageBlobs: any[] = [];
  public subtipos: any[] = [];
  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";

  public navigateFilterItens: any


  formData = {
    quantidade: '',
    descricao: '',
    compartimentoId:'',
    tipo_item_id:'',
    inputs: []
  };

  constructor(
    public filterItemService: FilterItemService,
    private activatedRoute: ActivatedRoute,
    private edificiosService: EdificiosService,
    private toastController: ToastController,
    private router: Router,
    private platform: Platform
  ) {
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
    this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];
    this.platform.backButton.subscribe(() => {
      this.setOpen(false, '');
    });
    
  }
  
  ionViewWillEnter() {
    this.navigateFilterItens = `filter-item/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`
    this.getSubTiposRows()
  }

  public currentTipoItemId: any

  setOpen(isOpen: boolean, id:any) {
    this.isModalOpen = isOpen;
    this.currentTipoItemId = id
    this.getModelo(id)
  }

  getSubTiposRows(){
    this.filterItemService.getByRow(this.activatedRoute.snapshot.params['row']).subscribe({
       next: async (result) => {
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
        source: CameraSource.Camera,
        width: 1280,
        height: 1000, 
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

  public submitButton: boolean = true;
  async handleSubmit() {
   this.submitButton = false 
    const payload = {
      descricao: this.formData.descricao,
      quantidade: this.formData.quantidade,
      tipo_item_id: this.currentTipoItemId,
      compartimentoId: this.activatedRoute.snapshot.params['compart_id'],
      inputs : this.formStruct
    }

     this.filterItemService.addItem(payload).subscribe({
      next: async (res) => {
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
        this.router.navigate([`itens/${this.activatedRoute.snapshot.params['prop_id']}/${this.activatedRoute.snapshot.params['edf_id']}/${this.activatedRoute.snapshot.params['compart_id']}`])
        await toast.present();
        this.submitButton = true
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Houve algum problema de conexão com a criação do seu item.',
          duration: 1500,
          position: 'top',
          color: 'warning'
        });
        await toast.present();
        this.submitButton = true
      }
    })
    // const toast = await this.toastController.create({
    //   message: 'Por favor preencha todos os campos.',
    //   duration: 1500,
    //   position: 'top',
    //   color: 'danger'
    // });
    // await toast.present();
    this.submitButton = true
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
