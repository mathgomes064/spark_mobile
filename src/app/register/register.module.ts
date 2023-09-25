import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { MessagesModule } from 'primeng/messages';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    MessagesModule,
    BlockLoadingComponent,
    ToastModule,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
