import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEdificioPageRoutingModule } from './detail-edificio-routing.module';

import { DetailEdificioPage } from './detail-edificio.page';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEdificioPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    BlockLoadingComponent
  ],
  declarations: [DetailEdificioPage]
})
export class DetailEdificioPageModule {}
