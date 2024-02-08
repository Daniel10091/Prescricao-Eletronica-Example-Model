import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
  },
  {
    path: 'prescricao-integracao',
    loadChildren: () => import('./pages/prescricao-integracao/prescricao-integracao.module').then(m => m.PrescricaoIntegracaoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }

}
