import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule),
  },
  {
    path: 'prescricao-integracao',
    loadChildren: () => import('./prescricao-integracao/prescricao-integracao.module').then(m => m.PrescricaoIntegracaoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {

  constructor() {
  }

}
