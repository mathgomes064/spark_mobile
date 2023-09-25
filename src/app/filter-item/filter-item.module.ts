import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterItemPageRoutingModule } from './filter-item-routing.module';

import { FilterItemPage } from './filter-item.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterItemPageRoutingModule,
    SharedModule
  ],
  declarations: [FilterItemPage]
})
export class FilterItemPageModule {}
