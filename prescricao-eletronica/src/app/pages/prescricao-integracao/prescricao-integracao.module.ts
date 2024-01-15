import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescricaoIntegracaoComponent } from './prescricao-integracao.component';
import { PrescricaoIntegracaoRoutingModule } from './prescricao-integracao-routing.module';

import { TabMenuModule } from 'primeng/tabmenu';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    PrescricaoIntegracaoComponent
  ],
  imports: [
    CommonModule,
    PrescricaoIntegracaoRoutingModule,

    TabMenuModule,

    FormsModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextareaModule,
    ButtonModule,
		MessagesModule,
		MessageModule,
		OverlayPanelModule,
    DialogModule,
		ToastModule
  ]
})
export class PrescricaoIntegracaoModule { }
