import { Component, OnInit } from '@angular/core';
import { QuadrosService } from './services/quadros.service';
import { ActivatedRoute } from '@angular/router';
import { Platform, ToastController, ViewWillEnter } from '@ionic/angular';
import { EdificiosService } from '../edificios/services/edificios.service';
import { Router } from '@angular/router';
import { DetailService } from '../detail-compartimento/services/detail.service';
import { environment } from 'src/environments/environment';
import { DetailPropriedadeService } from '../detail-propriedade/services/detail-propriedade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createDPS, createQuadro } from '../shared/models/models';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
  selector: 'app-quadros',
  templateUrl: './quadros.page.html',
  styleUrls: ['./quadros.page.scss'],
})
export class QuadrosPage implements OnInit, ViewWillEnter {
  public isModalOpen = false;

  public navigateDetailCompartimento: any

  public quadrosCompartimento:any;
  public detailCompartimento: any;
  public detailEdificio: any;
  public detailPropriedade: any;
  public currentAnexos: any[] = [];
  public imageBlobs: Blob[] = [];
  public geralOuInternos: boolean = false;
  public tipo_dps: Dps[] = [];
  public createDPS: boolean = false;
  public propriedade_id: string = "";
  public edificio_id: string = "";
  public compartimento_id: string = "";


  forward(){
    this.geralOuInternos = !this.geralOuInternos;
  }

  constructor(
    private quadroService : QuadrosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private detailService: DetailService,
    private detailPropriedadeService: DetailPropriedadeService,
    private edificiosService: EdificiosService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastController: ToastController,
    private platform : Platform
  ) {
    this.propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    this.edificio_id = this.activatedRoute.snapshot.params['edf_id'];
    this.compartimento_id = this.activatedRoute.snapshot.params['compart_id'];

    this.platform.backButton.subscribe(() => {
      this.isModalOpen = false
      this.setOpen();
    });
  }

  ngOnInit() {
    this.navigateDetailCompartimento = `detail-compartimento/${this.propriedade_id}/${this.edificio_id}/${this.compartimento_id}`
    this.createQuadroFormFunction(new createQuadro())
    this.createDPSFormFunction(new createDPS())
    this.getAllQuadros();

    let propriedade_id = this.activatedRoute.snapshot.params['prop_id']
    let edificio_id = this.activatedRoute.snapshot.params['edf_id']
    let compartimento_id = this.activatedRoute.snapshot.params['compart_id']

    this.detailService.getCompartimentosById(`${environment.BASE_URL}/compartimentos/${compartimento_id}`).subscribe({
      next: async (res: any) => {
        this.detailCompartimento = res;
      }
    })

    this.edificiosService.getById(edificio_id).subscribe({
      next: async (res: any) => {
        this.detailEdificio = res
      }
    })

    this.detailPropriedadeService.getPropriedadeById(`${environment.BASE_URL}/propriedade/${propriedade_id}`).subscribe({
      next: async (res: any) => {
        this.detailPropriedade = res
      }
    })

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
  }

  ionViewWillEnter(){
    this.getAllQuadros();
  }

  getAllQuadros(){
    this.quadroService.getQuadrosCompartimento(this.activatedRoute.snapshot.params['compart_id']).subscribe({
        next: async (res:any) => {
          this.quadrosCompartimento = res
        }
      })
  }

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
    this.geralOuInternos = false
  }

  createQuadroForm!: FormGroup;
  public createQuadroFormFunction(register: createQuadro){
    this.createQuadroForm = this.formBuilder.group({
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
      compartimento_id: this.activatedRoute.snapshot.params['compart_id'],
      dps_tipo_id: [register.dps_tipo_id, [Validators.required]]
    })
  }

  public submitButton: boolean = true;
  async onSubmit(){
   this.submitButton = false 
    if(this.createQuadroForm.valid){
      this.quadroService.createQuadro({
        quadro_descricao: this.createQuadroForm.value.quadro_descricao,
        tipo_qgbt:this.createQuadroForm.value.tipo_qgbt,
        tamanho_qgbt: this.createQuadroForm.value.tamanho_qgbt,
        quantidade_circuito: this.createQuadroForm.value.quantidade_circuito,
        monofasico:this.createQuadroForm.value.monofasico,
        bifasico: this.createQuadroForm.value.bifasico,
        trifasico: this.createQuadroForm.value.trifasico,
        disjuntor_principal: this.createQuadroForm.value.disjuntor_principal,
        polos: this.createQuadroForm.value.polos,
        possui_dps: this.createQuadroForm.value.possui_dps,
        quantidade_dps: this.createQuadroForm.value.quantidade_dps,
        dps_tipo_id: this.createQuadroForm.value.dps_tipo_id,
        compartimento_id: this.createQuadroForm.value.compartimento_id,
      }).subscribe({
        next: async(res: any) =>{
          await this.sendImages(res.id);
          this.getAllQuadros();
          this.cleanedModal(this.createQuadroForm)
          this.geralOuInternos = !this.geralOuInternos
          this.isModalOpen = !this.isModalOpen;

          const toast = await this.toastController.create({
            message: 'Quadro criado com sucesso.',
            duration: 1500,
            position: 'top',
            color: 'success' 
          });
          await toast.present();
          this.submitButton = true
        },
        error: async (err) =>{
          const toast = await this.toastController.create({
            message: 'Houve algum problema de conexão com a criação do seu quadro.',
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

  createDPSForm!: FormGroup;
  public createDPSFormFunction(register: createDPS){
    this.createDPSForm = this.formBuilder.group({
      classe: [register.classe, [Validators.required]],
      corrente: [register.corrente, [Validators.required]],
      tensao: [register.tensao, [Validators.required]],
    })
  }
  
  getDps(dps_id: any){
    if(dps_id == "-1"){
      this.createDPS = true
    }
  }

  closeDPS(){
    this.createDPS = false
    this.createQuadroForm.get('dps_tipo_id')!.setValue(null);
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
          this.createDPSForm.reset()
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
  
        const file = new File([blob], "image.png", { type: 'image/png' });
        
        this.imageBlobs.push(file);
        this.currentAnexos.push({ 'url': image.webPath });
      }
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }

  async sendImages(id_building: any) {
    const formData = new FormData();
    formData.append("ref", "Quadro");
    formData.append("id_ref", id_building);
  
    // Anexando todos os blobs ao FormData
    for (let blob of this.imageBlobs) {
      formData.append("files", blob);
    }
  
    this.edificiosService.uploadImage(formData).subscribe({
      next: async (response) => {
        this.quadroService.getQuadrosCompartimento(this.activatedRoute.snapshot.params['compart_id']).subscribe(
          {
            next: async (res:any) => {
              this.quadrosCompartimento = res
            }
          }
        )
        return response
      },
      error: async (error) => {
        return error
      }
    });
  }

  toDetail(quadroId:any){
    this.router.navigate(['/detail-quadro/' + this.activatedRoute.snapshot.params['prop_id'] + '/' + this.activatedRoute.snapshot.params['edf_id'] + '/' + `${this.activatedRoute.snapshot.params['compart_id']}/` + quadroId])
  }

  toRegisterQuadros(){
    // this.router.navigate(['register-quadros/' + this.activatedRoute.snapshot.params['prop_id'] + '/' + this.activatedRoute.snapshot.params['edf_id'] + '/' + this.activatedRoute.snapshot.params['compart_id']])
    this.isModalOpen = true;
  }

  cleanedModal(form: FormGroup){
    this.currentAnexos = [];
    this.imageBlobs = [];
    form.reset();
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
