import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPropriedadePage } from './detail-propriedade.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPropriedadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPropriedadePageRoutingModule {}
