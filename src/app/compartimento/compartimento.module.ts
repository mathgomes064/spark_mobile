import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompartimentoPageRoutingModule } from './compartimento-routing.module';

import { CompartimentoPage } from './compartimento.page';
import { SharedModule } from '../shared/shared.module';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartimentoPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MessagesModule,
    ToastModule,
    BlockLoadingComponent,
    DropdownModule
  ],
  declarations: [
    CompartimentoPage,
  ]
})
export class CompartimentoPageModule {}
