import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPropriedadePageRoutingModule } from './detail-propriedade-routing.module';
import { CarouselModule } from 'primeng/carousel';

import { DetailPropriedadePage } from './detail-propriedade.page';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPropriedadePageRoutingModule,
    CarouselModule,
    SharedModule,
  ],
  declarations: [
    DetailPropriedadePage
  ]
})
export class DetailPropriedadePageModule {}
