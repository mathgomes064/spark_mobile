import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterGroupsPageRoutingModule } from './filter-groups-routing.module';

import { FilterGroupsPage } from './filter-groups.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterGroupsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FilterGroupsPage]
})
export class FilterGroupsPageModule {}
