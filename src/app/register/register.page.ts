import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { register } from '../shared/models/models';
import { RegisterService } from './services/register.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [MessageService]
})
export class RegisterPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.createRegisterForm(new register())
  }

  registerForm!: FormGroup;
  public createRegisterForm(register: register){
    this.registerForm = this.formBuilder.group({
      name: [register.name, [Validators.required]],
      cpf: [register.cpf, [Validators.required]],
      telefone: [register.telefone, [Validators.required]],
      email: [register.email, [Validators.required, Validators.email]],
      password: [register.password, [Validators.required]],
      confirmPassword: [register.confirmPassword, [Validators.required]],
    })
  }

  public submiRegistertForm(){
    if(this.registerForm.valid){
      this.loadingService.present();
      this.registerService.register({
        ...this.registerForm.value
      }).pipe(first(), finalize(()=> {this.loadingService.dismiss()})).subscribe({
        next: (res) => {
          this.createUserPermissions(res.id)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuário Criado' });
          this.router.navigate(['login'])
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Dados Inválidos" })
    }
  }

  createUserPermissions(userId: string){
    let regularUser = [
      {
        "visualizar": false,
        "editar": false,
        "adicionar": false,
        "deletar": false,
        "tabela": "usuario",
        "user_id": userId
      },
      {
        "visualizar": true,
        "editar": false,
        "adicionar": false,
        "deletar": false,
        "tabela": "propriedade",
        "user_id": userId
      },
      {
        "visualizar": false,
        "editar": false,
        "adicionar": false,
        "deletar": false,
        "tabela": "proprietario",
        "user_id": userId
      },
      {
        "visualizar": true,
        "editar": false,
        "adicionar": false,
        "deletar": false,
        "tabela": "itens",
        "user_id": userId
      }
    ]

    let userAdminPermissions = [
      {
        "visualizar": true,
        "editar": true,
        "adicionar": true,
        "deletar": false,
        "tabela": "usuario",
        "user_id": userId
      },
      {
        "visualizar": true,
        "editar": true,
        "adicionar": true,
        "deletar": false,
        "tabela": "propriedade",
        "user_id": userId
      },
      {
        "visualizar": true,
        "editar": true,
        "adicionar": true,
        "deletar": false,
        "tabela": "proprietario",
        "user_id": userId
      },
      {
        "visualizar": true,
        "editar": true,
        "adicionar": true,
        "deletar": false,
        "tabela": "itens",
        "user_id": userId
      }
    ]

    this.registerService.registerUserPermissions(regularUser).subscribe(
      res =>{
      }
    )
  }

}
