import { compartimento } from './../shared/models/models';
import { LoadingService } from './../shared/block-loading/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './services/detail.service';
import { environment } from 'src/environments/environment';
import { editCompartimento } from '../shared/models/models';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { finalize, first } from 'rxjs';
import { Camera, CameraResultType , CameraSource} from '@capacitor/camera';
import { Router } from '@angular/router';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { EdificiosService } from '../edificios/services/edificios.service';

@Component({
  selector: 'app-detail-compartimento',
  templateUrl: './detail-compartimento.page.html',
  styleUrls: ['./detail-compartimento.page.scss'],

})
export class DetailCompartimentoPage implements ViewWillEnter {
  public isModalOpen = false;

  public pavimentos: Array<any> = [];

  public navigateCompartimento: any


  setOpen(data?: any) {
    this.isModalOpen = !this.isModalOpen;
    this.editCompartimentoForm(data);
  }

  public edificio_id: string = "";
  public propriedade_id: string = "";
  public imageBlobs: Blob[] = [];
  public currentAnexosToSave: any[] = [];
  public currentAnexos: any = [];

  public detailCompartimento: any;
  public propriedade: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private detailService: DetailService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private toastController: ToastController,
    private edificiosService: EdificiosService,
    private platform: Platform
  ) { 
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];

    this.platform.backButton.subscribe(() => {
      this.setOpen(false);
    });
  }

  ionViewWillEnter() {
    this.navigateCompartimento = `compartimento/${this.propriedade_id}/${this.edificio_id}`
    this.getEdificio()
    this.editCompartimentoForm(new editCompartimento())

    this.getSelectedCompartimento()

    this.listAnexosById(this.activatedRoute.snapshot.params['compart_id'])

    this.detailService.getPropriedadeById(`${environment.BASE_URL}/propriedade/${this.activatedRoute.snapshot.params['prop_id']}`).subscribe({
      next: async (res: any) => {
        this.propriedade = res
      }
    })
  } 

  getSelectedCompartimento(){
    let compartimento_id = this.activatedRoute.snapshot.params['compart_id']
    this.detailService.getCompartimentosById(`${environment.BASE_URL}/compartimentos/${compartimento_id}`).subscribe({
      next: async (res: any) =>{
        this.detailCompartimento = res
      }
    })
  }

  listAnexosById(id: string){
    this.detailService.getAnexosById(id).subscribe({
      next: async (res: any) =>{
        this.currentAnexos = res
      }
    })
  }

  getEdificio(){
    this.edificiosService.getById(this.edificio_id).subscribe({
     next: async (res: any) =>{
        this.criarPavimentos(res.pavimento, res.subsolo)
      }
    })
  }

   criarPavimentos(pavimento: number, subsolo: number) {
    for (let i = pavimento - subsolo - 1; i >= -subsolo; i--) {
      this.pavimentos!.push({ pavimento: i });
    }
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
        
        this.imageBlobs.push(file); 
        this.currentAnexos.push({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  compartimentoEditForm!: FormGroup;
  public editCompartimentoForm(register: editCompartimento){
    this.compartimentoEditForm = this.formBuilder.group({
      descricao: [register.descricao, [Validators.required]],
      largura: [register.largura, [Validators.required]],
      comprimento: [register.comprimento, [Validators.required]],
      andar_compartimento: [register.andar_compartimento, [Validators.required]]
    })
  }

  public submitButton: boolean = true;
  async submitForm(){
    this.submitButton = false
    let compartimentoToUpdate =  this.activatedRoute.snapshot.params['compart_id']

    if(this.compartimentoEditForm.valid){
      this.detailService.updateCompartimento(
        compartimentoToUpdate, this.compartimentoEditForm.value
      ).subscribe({
        next: async (res: any) => {
          await this.sendImages(res.id);
          this.imageBlobs = []
          this.currentAnexosToSave = []
          this.detailCompartimento = res
          this.isModalOpen = !this.isModalOpen
          const toast = await this.toastController.create({
            message: 'Compartimento atualizado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
          this.submitButton = true
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a edição do seu compartimento.',
            duration: 1500,
            position: 'top',
            color: 'warning'
          });
          await toast.present();
          this.submitButton = true
        }
      })
    }else{
      const toast = await this.toastController.create({
        message: 'Por favor preencha todos os campos.',
        duration: 1500,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      this.submitButton = true
    }
  }

  async sendImages(compartimento_id: any) {
    const formData = new FormData();
    formData.append("ref", "Compartimento");
    formData.append("id_ref", compartimento_id);
  
    // Anexando todos os blobs ao FormData
    for (let blob of this.imageBlobs) {
      formData.append("files", blob);
    }
  
    return this.detailService.uploadImage(formData).subscribe({
      next: async (response) => {
      this.listAnexosById(this.activatedRoute.snapshot.params['compart_id'])

        console.log(response);
      },
      error: async (error) => {
        console.log(error);
      }
    });
  }

  ToQuadros() {
    this.router.navigate(['quadros/'+ this.activatedRoute.snapshot.params['prop_id'] + '/' + this.activatedRoute.snapshot.params['edf_id'] + '/' + this.activatedRoute.snapshot.params['compart_id']])
  }

  ToItens() {
    this.router.navigate([`itens/${this.activatedRoute.snapshot.params['prop_id']}/${this.activatedRoute.snapshot.params['edf_id']}/${this.activatedRoute.snapshot.params['compart_id']}`])
  }
}
