import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrosPageRoutingModule } from './quadros-routing.module';

import { QuadrosPage } from './quadros.page';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { BlockLoadingComponent } from '../shared/block-loading/block-loading.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrosPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DropdownModule,
    BlockLoadingComponent,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
  declarations: [QuadrosPage]
})
export class QuadrosPageModule {}
