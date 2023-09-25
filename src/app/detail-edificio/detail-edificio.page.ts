import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPropriedadeService } from '../detail-propriedade/services/detail-propriedade.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdificiosService } from '../edificios/services/edificios.service';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-detail-edificio',
  templateUrl: './detail-edificio.page.html',
  styleUrls: ['./detail-edificio.page.scss'],
})
export class DetailEdificioPage implements ViewWillEnter {
  public currentAnexos: any[] = []
  public isModalOpen = false;
  public buildingForm! : FormGroup
  public uuidBuilding:string = '' 
  public imageBlobs: Blob[] = [];
  public buildDetail: any
  public detailPropriedade: any

  public navigateEdificio: any
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private detailPropriedadeService: DetailPropriedadeService,
    private formBuilder: FormBuilder,
    private edificioService : EdificiosService,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      this.setOpen(false);
    });
  }

  ionViewWillEnter() {
    this.navigateEdificio = `edificios/${this.activatedRoute.snapshot.params['prop_id']}`
    this.uuidBuilding = this.activatedRoute.snapshot.params['edf_id'];

    this.detailPropriedadeService.getAnexosById(`${environment.BASE_URL}/edificio/anexos/${this.uuidBuilding}`).subscribe({
      next: async (res: any) => {
        this.currentAnexos = res;
      }
    });

    let prop_id = this.activatedRoute.snapshot.params['prop_id'];
    this.detailPropriedadeService.getPropriedadeById(`${environment.BASE_URL}/propriedade/${prop_id}`).subscribe({
      next: async (res: any) =>{
        this.detailPropriedade = res
      }
    })
  
    this.createBuildForm();
  
    this.getById()
  }

  async getById() {
    this.edificioService.getById(this.uuidBuilding).subscribe({
      next: async (res: any) => {
        this.buildDetail = res
        this.buildingForm.patchValue({
          comprimento: res.comprimento,
          descricao: res.descricao,
          largura: res.largura,
          nome: res.nome,
          pavimento: res.pavimento,
          subsolo: res.subsolo,
        });
      }
    });
  }
  
  public createBuildForm() {
    this.buildingForm = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      largura: ['', [Validators.required]],
      comprimento: ['', [Validators.required]],
      pavimento: ['', [Validators.required]],
      subsolo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
    });
  }
  
  toCompartimentos(){
    this.router.navigate(['/compartimento/'+ `${this.activatedRoute.snapshot.params['prop_id']}/` + this.activatedRoute.snapshot.params['edf_id']])
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
        this.currentAnexos.unshift({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  public submitButton: boolean = true;
  async onSubmit(form: FormGroup){
    this.submitButton = false
    if(form.valid){
      this.edificioService.updateBulding(
        form.value, this.uuidBuilding
        ).subscribe({
          next: async (res: any) => {
            await this.sendImages(res.id);
            this.cleanedModal()
            this.getById()

            const toast = await this.toastController.create({
              message: 'Edifício atualizado com sucesso.',
              duration: 1500,
              position: 'top',
              color: 'success' 
            });
            await toast.present();
            this.submitButton = true
          },
          error: async (error) => {
            const toast = await this.toastController.create({
              message: 'Houve algum problema de conexão com a atualizacao do seu edifício.',
              duration: 1500,
              position: 'bottom',
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
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
        this.submitButton = true
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
  
    this.edificioService.uploadImage(formData).subscribe({
      next: async (response) => {
        this.getById()
        return response
      },
      error: async (error) => {
        return error

      }
    });
  }
  
  cleanedModal(){
    this.setOpen(false);
  }

  convertNumbers(number: any) {
    return Math.round(Number(number));
  }

}
