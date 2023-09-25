import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdificiosPageRoutingModule } from './edificios-routing.module';

import { EdificiosPage } from './edificios.page';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdificiosPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BlockLoadingComponent
  ],
  declarations: [EdificiosPage],

})
export class EdificiosPageModule {}
