import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterQuadroPageRoutingModule } from './register-quadro-routing.module';

import { RegisterQuadroPage } from './register-quadro.page';
import { SharedModule } from '../shared/shared.module';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterQuadroPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StepsModule,
    DividerModule,
    ToastModule,
    BlockLoadingComponent,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule
  ],
  
  declarations: [RegisterQuadroPage]
})
export class RegisterQuadroPageModule {}
