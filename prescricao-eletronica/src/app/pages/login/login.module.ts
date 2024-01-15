import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrescricaoRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PrescricaoRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    OverlayPanelModule,
    ButtonModule,
    RadioButtonModule,

    NgxCaptchaModule
  ]
})
export class LoginModule { }
