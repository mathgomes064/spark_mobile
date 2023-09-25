import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompartimentoService } from './services/compartimento.service';
import { environment } from 'src/environments/environment';
import { compartimento } from '../shared/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { EdificiosService } from '../edificios/services/edificios.service';

@Component({
  selector: 'app-compartimento',
  templateUrl: './compartimento.page.html',
  styleUrls: ['./compartimento.page.scss'],
})
export class CompartimentoPage implements ViewWillEnter {
  public isModalOpen = false;

  public pavimentos: Array<any> = [];

  public navigateDetailEdificio: any

  setOpen(choice: boolean) {
    this.isModalOpen = choice;
  }

  public compartimentos: any
  public setCompartimentos: any

  public edificio_id: string = "";
  public propriedade_id: string = "";
  public imageBlobs: Blob[] = [];
  public currentAnexosToSave: any = [];
  public anexosSave: any = [];

  constructor(
    private compartimentoService: CompartimentoService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastController: ToastController,
    private edificiosService: EdificiosService,
    private platform: Platform
  ) {
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id']

    this.platform.backButton.subscribe(() => {
      this.setOpen(false);
    });
  }

  ionViewWillEnter(): void {
    this.navigateDetailEdificio = `detail-edificio/${this.propriedade_id}/${this.edificio_id}`
    this.getEdificio()
    this.getAllCompartimentos()

    this.createCompartimentoForm(new compartimento())
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
  
        // Cria um objeto File a partir do blob
        const file = new File([blob], "image.png", { type: 'image/png' });
        
        this.imageBlobs.push(file); // Substitua imageBlobs com o nome do array que você está usando
        this.currentAnexosToSave.push({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  getAllCompartimentos(){
    this.compartimentoService.getCompartimentos(
      `${environment.BASE_URL}/compartimentos/filter/edf/${this.activatedRoute.snapshot.params['edf_id']}`
     ).subscribe({
      next: async (res: any) =>{
        this.setCompartimentos = res
        this.compartimentos = this.setCompartimentos
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
  

  compartimentoForm!: FormGroup;
  public createCompartimentoForm(register: compartimento){
    this.compartimentoForm = this.formBuilder.group({
      descricao: [register.descricao, [Validators.required]],
      largura: [register.largura, [Validators.required]],
      comprimento: [register.comprimento, [Validators.required]],
      andar_compartimento: [register.andar_compartimento, [Validators.required]]
    })
  }

public submitButton: boolean = true;
 async submitForm(){
  this.submitButton = false
    if(this.compartimentoForm.valid){
      this.compartimentoService.registerCompartiemento({
        descricao: this.compartimentoForm.value.descricao,
        largura: this.compartimentoForm.value.largura,
        comprimento: this.compartimentoForm.value.comprimento,
        andar_compartimento: this.compartimentoForm.value.andar_compartimento,
        edificio_id: this.activatedRoute.snapshot.params['edf_id']

      }).subscribe({
        next: async (res) => {
          await this.sendImages(res.id);

          this.cleanedModal(this.compartimentoForm)

          this.compartimentos.push(res)
          
          this.isModalOpen = false;

          const toast = await this.toastController.create({
            message: 'Compartimento criado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
          this.submitButton = true
        },
        error: async(err) => {
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a criação do seu compartimento.',
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
  
    return this.compartimentoService.uploadImage(formData).subscribe({
      next: async (response) => {
        this.getAllCompartimentos()
      },
      error: async (error) => {
        console.log(error);
      }
    });
  }

  cleanedModal(form: FormGroup){
    this.imageBlobs = [];
    this.anexosSave = [];
    this.currentAnexosToSave = [];
    this.setOpen(false);
    form.reset();
  }

  public search(value: string){
    const filter = this.setCompartimentos.filter((res: any) =>{
      return !res.descricao.toLowerCase().indexOf(value.toLowerCase());
    })
    this.compartimentos = filter;
  }
}
