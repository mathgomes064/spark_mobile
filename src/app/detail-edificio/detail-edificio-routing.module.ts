import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEdificioPage } from './detail-edificio.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEdificioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEdificioPageRoutingModule {}
