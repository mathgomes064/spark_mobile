import { Component } from '@angular/core';
import { QuadrosService } from '../quadros/services/quadros.service';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from '../detail-compartimento/services/detail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createDPS, editQuadro } from '../shared/models/models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';

interface Linha{
  descricao: string;
}

interface Dps{
  id: string,
  classe: string;
  corrente?: string;
  tensao?: string;
}

@Component({
  selector: 'app-detail-quadro',
  templateUrl: './detail-quadro.page.html',
  styleUrls: ['./detail-quadro.page.scss'],
})

export class DetailQuadroPage implements ViewWillEnter {
  public isModalOpen = false;
  public geralOuInternos: boolean = false;
  public createDPS: boolean = false;
  public tipo_dps: Dps[] = [];
  public imageBlobs: Blob[] = [];
  public currentAnexos: any = [];
  public quadro: any;

  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";

  public navigateQuadro: any

  forward(){
    this.geralOuInternos = !this.geralOuInternos
  }

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
    this.geralOuInternos = false
    let id_quadro = this.activatedRoute.snapshot.params['quadro_id']
    this.quadroService.getQuadroWithGroup(id_quadro).subscribe({
      next: async (res) => {
        this.updateBuildForm(res)
      }
    })
  }

  constructor(
    public quadroService: QuadrosService,
    private activatedRoute: ActivatedRoute,
    private detailService: DetailService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastController: ToastController,
    public platform: Platform
  ) {
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
    this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];

    this.platform.backButton.subscribe(() => {
      this.isModalOpen = false
      this.setOpen();
    });
    
  }

  ionViewWillEnter() {
    this.navigateQuadro = `quadros/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`

    this.getQuadro();
    
    this.listAnexosById(this.activatedRoute.snapshot.params['quadro_id']);
    
    this.quadroService.getDpsTipo().subscribe({
      next: async (res: any) => {
          res.forEach((objeto: any) => {
            const { id, classe, corrente, tensao } = objeto;
            this.tipo_dps.push({ id, classe, corrente, tensao });
          });
          this.tipo_dps.push({
            id: "-1",
            classe: "Adicionar Tipo de DPS"  
          })
        }
      })

      this.updateBuildForm(new editQuadro());
      this.createDPSFormFunction(new createDPS());
  }

  getQuadro(){
    let id_quadro = this.activatedRoute.snapshot.params['quadro_id'];
    this.quadroService.getQuadroWithGroup(id_quadro).subscribe({
      next: async (res) => {
        this.quadro = res
        this.updateBuildForm(res)
      }
    })
  }

  getDps(dps_id: any){
    if(dps_id.id == "-1"){
      this.createDPS = !this.createDPS
    }
  }

  listAnexosById(id: string){
    this.detailService.getAnexosById(id).subscribe({
      next: async (res: any) =>{
        this.currentAnexos = res
      }
    })
  }

  quadroEditForm!: FormGroup;
  public updateBuildForm(register: editQuadro){
    this.quadroEditForm = this.formBuilder.group({
      quadro_descricao: [register.quadro_descricao, [Validators.required]],
      tipo_qgbt: [register.tipo_qgbt, [Validators.required]],
      tamanho_qgbt: [register.tamanho_qgbt, [Validators.required]],
      quantidade_circuito: [register.quantidade_circuito, [Validators.required]],
      monofasico: [register.monofasico, [Validators.required]],
      bifasico: [register.bifasico, [Validators.required]],
      trifasico: [register.trifasico, [Validators.required]],
      disjuntor_principal: [register.disjuntor_principal, [Validators.required]],
      polos: [register.polos, [Validators.required]],
      possui_dps: [register.possui_dps, [Validators.required]],
      quantidade_dps: [register.quantidade_dps, [Validators.required]],
      dps_tipo_id: [register.dps_tipo_id, [Validators.required]]
    })
  }

  createDPSForm!: FormGroup;
  public createDPSFormFunction(register: createDPS){
    this.createDPSForm = this.formBuilder.group({
      classe: [register.classe, [Validators.required]],
      corrente: [register.corrente, [Validators.required]],
      tensao: [register.tensao, [Validators.required]],
    })
  }

  public submitButton: boolean = true;
  async onSubmit() {
    this.submitButton = false
    let quadroToUpdateId = this.activatedRoute.snapshot.params['quadro_id']
    if (this.quadroEditForm.valid) {
      this.quadroService.updateQuadro(
        quadroToUpdateId, {
          quadro_descricao: this.quadroEditForm.value.quadro_descricao,
          tipo_qgbt:this.quadroEditForm.value.tipo_qgbt,
          tamanho_qgbt: this.quadroEditForm.value.tamanho_qgbt,
          quantidade_circuito: this.quadroEditForm.value.quantidade_circuito,
          monofasico:this.quadroEditForm.value.monofasico,
          bifasico: this.quadroEditForm.value.bifasico,
          trifasico: this.quadroEditForm.value.trifasico,
          disjuntor_principal: this.quadroEditForm.value.disjuntor_principal,
          polos: this.quadroEditForm.value.polos,
          possui_dps: this.quadroEditForm.value.possui_dps,
          quantidade_dps: this.quadroEditForm.value.quantidade_dps,
          dps_tipo_id: this.quadroEditForm.value.dps_tipo_id.id,
        }
        ).subscribe({
        next: async (res: any) => {
          this.sendImages(res.id);
          this.getQuadro()
          this.imageBlobs = []
          this.isModalOpen = !this.isModalOpen
          this.geralOuInternos = !this.geralOuInternos
          const toast = await this.toastController.create({
            message: 'Quadro atualizado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
          this.submitButton = true
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a atualização do quadro',
            duration: 1500,
            position: 'top',
            color: 'warning'
          });
          await toast.present();
          this.submitButton = true
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
      this.submitButton = true
    }
  }

  async onSubmitDPS(){
    if(this.createDPSForm.valid){
      this.loadingService.present(); 
      this.quadroService.createDpsTipo({
        ...this.createDPSForm.value
      }).pipe(first(), finalize(()=> {this.loadingService.dismiss()})).subscribe({
        next: async (res: any) => {
          let item = this.tipo_dps.pop()
          this.tipo_dps.push(res)
          this.tipo_dps.push(item!)
          this.createDPSForm.reset();
          this.createDPS = !this.createDPS
          const toast = await this.toastController.create({
            message: 'DPS criado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a criação do seu DPS.',
            duration: 1500,
            position: 'top',
            color: 'warning'
          });
          await toast.present();
        }
      })
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor preencha todos os campos.',
        duration: 1500,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
    }
  }

  async sendImages(quadro_id: any) {
    const formData = new FormData();
    formData.append("ref", "Quadro");
    formData.append("id_ref", quadro_id);
  
    // Anexando todos os blobs ao FormData
    for (let blob of this.imageBlobs) {
      formData.append("files", blob);
    }
  
    return this.detailService.uploadImage(formData).subscribe({
      next: async (response) => {
      this.listAnexosById(this.activatedRoute.snapshot.params['quadro_id'])

        console.log(response);
      },
      error: async (error) => {
        console.log(error);
      }
    });
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

  tipo_qgbt: Linha[] = [
    {descricao: "Sobrepor"},
    {descricao: "Embutido"},
  ];

  tamanho_qgbt: Linha[] = [
    {descricao: "2 circuitos"},
    {descricao: "4 circuitos"},
    {descricao: "6 circuitos"},
    {descricao: "8 circuitos"},
    {descricao: "10 circuitos"},
    {descricao: "12 circuitos"},
    {descricao: "16 circuitos"},
    {descricao: "20 circuitos"},
  ]

  disjuntor_principal: Linha[] = [
    {descricao: "16 A"},
    {descricao: "20 A"},
    {descricao: "32 A"},
    {descricao: "40 A"},
    {descricao: "50 A"},
    {descricao: "63 A"},
    {descricao: "80 A"},
    {descricao: "90 A"},
    {descricao: "100 A"},
    {descricao: "125 A"},
    {descricao: "150 A"},
    {descricao: "160 A"},
    {descricao: "200 A"},
  ]

  polos: Linha[] = [
    {descricao: "Monopolar"},
    {descricao: "Bipolar"},
    {descricao: "Tripolar"},
  ];

  possui_dps: Linha[] = [
    {descricao: "Sim"},
    {descricao: "Não"},
  ];
}
