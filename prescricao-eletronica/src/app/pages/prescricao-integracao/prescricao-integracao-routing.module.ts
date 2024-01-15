import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescricaoIntegracaoComponent } from './prescricao-integracao.component';

const routes: Routes = [
  {
    path: '',
    component: PrescricaoIntegracaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescricaoIntegracaoRoutingModule {

  constructor() {
  }

}
