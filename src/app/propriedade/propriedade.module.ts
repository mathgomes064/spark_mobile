import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropriedadePageRoutingModule } from './propriedade-routing.module';

import { PropriedadePage } from './propriedade.page';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropriedadePageRoutingModule,
    SharedModule,
    InputTextModule,
  ],
  declarations: [PropriedadePage]
})
export class PropriedadePageModule {}
