import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compartimento } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { CompartimentoService } from 'src/app/compartimento/services/compartimento.service';
import { LoadingService } from '../../block-loading/services/loading.service';
import { finalize, first } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CompartimentoPage } from 'src/app/compartimento/compartimento.page';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-compartimento-form',
  templateUrl: './compartimento-form.component.html',
  styleUrls: ['./compartimento-form.component.scss'],
  providers: [MessageService]
})
export class CompartimentoFormComponent implements OnInit {
  public isModalOpen = false;

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private compartimentoService: CompartimentoService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private compartimentoPage: CompartimentoPage,
    private platform : Platform

  ) { 
    this.platform.backButton.subscribe(() => {
      this.isModalOpen = false
      this.setOpen();
    });
  }

  ngOnInit() {
    this.createCompartimentoForm(new compartimento())
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

  public submitForm(){
    if(this.compartimentoForm.valid){
      this.loadingService.present(); 
      this.compartimentoService.registerCompartiemento({
        descricao: this.compartimentoForm.value.descricao,
        largura: this.compartimentoForm.value.largura,
        comprimento: this.compartimentoForm.value.comprimento,
        andar_compartimento: this.compartimentoForm.value.andar_compartimento,
        edificio_id: this.activatedRoute.snapshot.params['id']

      }).pipe(first(), finalize(()=> {this.loadingService.dismiss()})).subscribe({
        next: async (res: any) => {
          this.compartimentoPage.compartimentos.push(res)
          this.isModalOpen = !this.isModalOpen

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Compartimento Cadastrado' });
        },
        error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error })
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Dados Inválidos" })
    }
  }
}
