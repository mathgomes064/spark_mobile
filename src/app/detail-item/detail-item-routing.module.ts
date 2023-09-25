import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailItemPage } from './detail-item.page';

const routes: Routes = [
  {
    path: '',
    component: DetailItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailItemPageRoutingModule {}
