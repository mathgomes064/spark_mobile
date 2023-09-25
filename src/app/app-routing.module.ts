import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: "", 
    pathMatch: "full", 
    redirectTo: "home"
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'propriedade',
    loadChildren: () => import('./propriedade/propriedade.module').then( m => m.PropriedadePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-propriedade/:prop_id',
    loadChildren: () => import('./detail-propriedade/detail-propriedade.module').then( m => m.DetailPropriedadePageModule),
  },
  {
    path: 'edificios/:prop_id',
    loadChildren: () => import('./edificios/edificios.module').then( m => m.EdificiosPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'detail-edificio/:prop_id/:edf_id',
    loadChildren: () => import('./detail-edificio/detail-edificio.module').then( m => m.DetailEdificioPageModule)
  },
  {
    path: 'compartimento/:prop_id/:edf_id',
    loadChildren: () => import('./compartimento/compartimento.module').then( m => m.CompartimentoPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'detail-compartimento/:prop_id/:edf_id/:compart_id',
    loadChildren: () => import('./detail-compartimento/detail-compartimento.module').then( m => m.DetailCompartimentoPageModule)
  },
  {
    path: 'quadros/:prop_id/:edf_id/:compart_id',
    loadChildren: () => import('./quadros/quadros.module').then( m => m.QuadrosPageModule)
  },
  {
    path: 'register-quadros/:prop_id/:edf_id/:compart_id',
    loadChildren: () => import('./register-quadro/register-quadro.module').then( m => m.RegisterQuadroPageModule)
  },
  {
    path: 'detail-quadro/:prop_id/:edf_id/:compart_id/:quadro_id',
    loadChildren: () => import('./detail-quadro/detail-quadro.module').then( m => m.DetailQuadroPageModule)
  },
  {
    path: 'itens/:prop_id/:edf_id/:compart_id',
    loadChildren: () => import('./itens/itens.module').then( m => m.ItensPageModule)
  },
  {
    path: 'filter-item/:prop_id/:edf_id/:compart_id',
    loadChildren: () => import('./filter-item/filter-item.module').then( m => m.FilterItemPageModule)
  },
  {
    path: 'itens',
    loadChildren: () => import('./itens/itens.module').then( m => m.ItensPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'detail-item/:prop_id/:edf_id/:compart_id/:item_id',
    loadChildren: () => import('./detail-item/detail-item.module').then( m => m.DetailItemPageModule)
  }

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
