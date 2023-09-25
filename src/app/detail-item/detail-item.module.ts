import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailItemPageRoutingModule } from './detail-item-routing.module';

import { DetailItemPage } from './detail-item.page';
import { SharedModule } from '../shared/shared.module';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailItemPageRoutingModule,
    SharedModule,
    BlockLoadingComponent,
  ],
  declarations: [DetailItemPage]
})
export class DetailItemPageModule {}
