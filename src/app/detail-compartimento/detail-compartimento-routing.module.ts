import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCompartimentoPage } from './detail-compartimento.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCompartimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCompartimentoPageRoutingModule {}
