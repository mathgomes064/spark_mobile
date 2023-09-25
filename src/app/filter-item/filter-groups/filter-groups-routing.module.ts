import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterGroupsPage } from './filter-groups.page';

const routes: Routes = [
  {
    path: '',
    component: FilterGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterGroupsPageRoutingModule {}
