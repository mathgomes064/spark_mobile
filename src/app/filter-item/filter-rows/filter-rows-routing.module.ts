import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterRowsPage } from './filter-rows.page';

const routes: Routes = [
  {
    path: '',
    component: FilterRowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterRowsPageRoutingModule {}
