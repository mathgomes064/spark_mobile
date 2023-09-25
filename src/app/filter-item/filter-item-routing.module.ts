import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterItemPage } from './filter-item.page';

const routes: Routes = [
  {
    path: '',
    component: FilterItemPage
  },
  {
    path: 'filter-groups/:group_id',
    loadChildren: () => import('./filter-groups/filter-groups.module').then( m => m.FilterGroupsPageModule)
  },
  {
    path: 'filter-rows/:row',
    loadChildren: () => import('./filter-rows/filter-rows.module').then( m => m.FilterRowsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterItemPageRoutingModule {}
