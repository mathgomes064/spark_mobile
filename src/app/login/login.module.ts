import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

import { LoginPage } from './login.page';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { PasswordModule } from 'primeng/password';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MessagesModule,
    ToastModule,
    BlockLoadingComponent,
    PasswordModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
