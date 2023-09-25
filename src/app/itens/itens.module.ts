import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItensPageRoutingModule } from './itens-routing.module';

import { ItensPage } from './itens.page';
import { SharedModule } from '../shared/shared.module';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItensPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BlockLoadingComponent,
  ],
  declarations: [ItensPage]
})
export class ItensPageModule {}
