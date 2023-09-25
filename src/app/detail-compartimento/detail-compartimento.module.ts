import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCompartimentoPageRoutingModule } from './detail-compartimento-routing.module';

import { DetailCompartimentoPage } from './detail-compartimento.page';
import { SharedModule } from '../shared/shared.module';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailCompartimentoPageRoutingModule,
    SharedModule, 
    MessagesModule,
    ToastModule,
    BlockLoadingComponent,
    DropdownModule
  ],
  declarations: [DetailCompartimentoPage]
})
export class DetailCompartimentoPageModule {}
