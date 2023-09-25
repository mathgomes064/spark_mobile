import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompartimentoPage } from './compartimento.page';

const routes: Routes = [
  {
    path: '',
    component: CompartimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompartimentoPageRoutingModule {}
