import { Component, OnInit } from '@angular/core';
import { login } from '../shared/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../shared/block-loading/services/loading.service';
import { LoginService } from './services/login.service';
import { finalize, first } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [MessageService]
})
export class LoginPage implements OnInit {
  public showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createLoginForm(new login())
  }

  loginForm!: FormGroup;
  public createLoginForm(register: login){
    this.loginForm = this.formBuilder.group({
      email: [register.email, [Validators.required, Validators.email]],
      password: [register.password, [Validators.required]]
    })
  }

  public submitForm(){
    if(this.loginForm.valid){
      this.loadingService.present();
      this.loginService.login({
        ...this.loginForm.value
      }).pipe(first(), finalize(()=> {this.loadingService.dismiss()})).subscribe({
        next: async (res: any) => {
          localStorage.clear()
          localStorage.setItem('access_token', res.token.token)
          let userPermissions = JSON.stringify(res.token.userPermissions)
          localStorage.setItem('user_permissions', userPermissions)
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Email ou senha inválidos" })
    }
  }
}
