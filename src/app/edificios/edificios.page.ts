import { Component } from '@angular/core';
import { EdificiosService } from './services/edificios.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.page.html',
  styleUrls: ['./edificios.page.scss'],
  providers: [MessageService]

})
export class EdificiosPage implements ViewWillEnter {
  public allBuilding: any
  public setAllBuilding: any
  public uuidProperty:string = ''
  public currentAnexos: any[] = []
  public anexosSave: any[] = []
  public isModalOpen = false;
  public buildingForm! : FormGroup
  public imageBlobs: Blob[] = [];
  showSplash = true;
  public submitButton: boolean = false;

  public navigateDetailPropriedade: any

  formData = {
    descricao: '',
    largura: '',
    comprimento: '',
    pavimento: '',
    subsolo: '',
    nome:'',
  };

  constructor(
    private edificiosService: EdificiosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private platform: Platform,
  ) {
 
    this.platform.backButton.subscribe(() => {
      this.setOpen(false);
    });
    
  }

  ionViewWillEnter() {
    this.navigateDetailPropriedade = `detail-propriedade/${this.activatedRoute.snapshot.params['prop_id']}`
    this.uuidProperty = this.activatedRoute.snapshot.params['prop_id']

    if(this.uuidProperty){
      this.getAllBuilding(this.uuidProperty);
    }
    this.createBuildForm()

  }



  public createBuildForm(){
    this.buildingForm = this.formBuilder.group({
      descricao: [this.formData.descricao, [Validators.required]],
      largura: [this.formData.largura, [Validators.required]],
      comprimento: [this.formData.comprimento,  [Validators.required]],
      pavimento: [this.formData.pavimento,  [Validators.required]],
      subsolo: [this.formData.subsolo,  [Validators.required]],
      nome: [this.formData.nome,  [Validators.required]],
    })
  }

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
  }
  

  
  async getAllBuilding(propertyId: string) {
    this.edificiosService.getBuilding(
      propertyId
      ).subscribe({
      next: async (res: any) => {
        if (res) {
          this.setAllBuilding = res;
          this.allBuilding = this.setAllBuilding
        }
      }
    });
  }

  public convertNumbers(largura:string, comprimento:string){
   const larguraFormat = parseInt(largura, 10);
   const comprimentoFormat = parseInt(comprimento, 10);

   return `${larguraFormat} x ${comprimentoFormat}`

  }

  public ToDetails(buildingId:string){
    this.router.navigate(['detail-edificio/' + this.uuidProperty + '/' + buildingId])
  }

  public toForm(){
    this.router.navigate(['/detail-edificio/'])
  }

  public async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        source: CameraSource.Camera,
        width: 1920,
        height: 1000,
        presentationStyle:'popover'
      });
      
      if (image?.webPath) {
        let blob = await fetch(image.webPath).then(r => r.blob());
  
        // Cria um objeto File a partir do blob
        const file = new File([blob], "image.png", { type: 'image/png' });
        
        this.imageBlobs.push(file); // Substitua imageBlobs com o nome do array que você está usando
        this.currentAnexos.push({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  async onSubmit(form: FormGroup) {
    this.submitButton = true
    if (form.valid) {
      let buildingData = {
        'propriedade_id': this.activatedRoute.snapshot.params['prop_id'],
        ...form.value
      };
      this.edificiosService.createBuilding(
        buildingData
      ).subscribe({
        next: async (response: any) => {
          await this.sendImages(response.id);
          this.getAllBuilding(this.uuidProperty);
          this.cleanedModal(form)
          const toast = await this.toastController.create({
            message: 'Edifício criado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
          this.submitButton = false
        },
        error: async (error) => {
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a criação do seu edifício.',
            duration: 1500,
            position: 'top',
            color: 'warning'
          });
          await toast.present();
          this.submitButton = false
        }
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor preencha todos os campos.',
        duration: 1500,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      this.submitButton = false
    }
  }


  async sendImages(id_building: any) {
    const formData = new FormData();
    formData.append("ref", "Edificio");
    formData.append("id_ref", id_building);
  
    // Anexando todos os blobs ao FormData
    for (let blob of this.imageBlobs) {
      formData.append("files", blob);
    }
  
    this.edificiosService.uploadImage(formData).subscribe({
      next: async (response) => {
        this.getAllBuilding(this.uuidProperty);
        return response
      },
      error: async (error) => {
        return error
      }
    });
  }

  cleanedModal(form:FormGroup){
    this.imageBlobs = [];
    this.anexosSave = [];
    this.currentAnexos = [];
    this.setOpen(false);
    form.reset();
  }

  public search(value: string){
    const filter = this.setAllBuilding.filter((res: any) =>{
      return !res.nome.toLowerCase().indexOf(value.toLowerCase());
    })
    this.allBuilding = filter;
  }
}

