import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailQuadroPageRoutingModule } from './detail-quadro-routing.module';

import { DetailQuadroPage } from './detail-quadro.page';
import { SharedModule } from '../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
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
    DetailQuadroPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    BlockLoadingComponent,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [DetailQuadroPage]
})
export class DetailQuadroPageModule {}
