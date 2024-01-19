import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CookieService } from 'src/app/services/cookie.service';

class Login {
  login!: string;
  uf!: string;
  password!: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit {
  
  protected systemIntegration: boolean = true;

  // Login models
  public loginModel: any;
  public isDoctor: boolean = true;
  public isPharmaceutical: boolean = false;
  
  // Validations
  public invalidLogin: boolean = false;
  public invalidUF: boolean = false;
  public invalidPassword: boolean = false;
  public invalidRecaptcha: boolean = false;
  
  // Form
  protected formCliente: FormGroup = new FormGroup({});
  
  // DropDown
  protected ufs: SelectItem[] = [];
  protected selectedUfDrop: SelectItem[] = [];

  // Form data
  protected login: any = '';
  protected uf: any = '';
  protected password: any = '';
  
  // Captcha
  protected siteKey: string = '6LepbP0UAAAAAJ4txXicgIKYE_GRgP6djVysEAi3';

  constructor(
    private service: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (this.userIsAuthenticated()) {
      this.router.navigate(['prescricao-integracao']);
    }

    this.loginModel = 'Doctor';
    
    this.createForm(new Login());

    this.ufs = [
      { label: 'Selecione', value: null },
      { label: 'AC', value: 'AC' },
      { label: 'AL', value: 'AL' },
      { label: 'AP', value: 'AP' },
      { label: 'AM', value: 'AM' },
      { label: 'BA', value: 'BA' },
      { label: 'CE', value: 'CE' },
      { label: 'DF', value: 'DF' },
      { label: 'ES', value: 'ES' },
      { label: 'GO', value: 'GO' },
      { label: 'MA', value: 'MA' },
      { label: 'MT', value: 'MT' },
      { label: 'MS', value: 'MS' },
      { label: 'MG', value: 'MG' },
      { label: 'PA', value: 'PA' },
      { label: 'PB', value: 'PB' },
      { label: 'PR', value: 'PR' },
      { label: 'PE', value: 'PE' },
      { label: 'PI', value: 'PI' },
      { label: 'RJ', value: 'RJ' },
      { label: 'RN', value: 'RN' },
      { label: 'RS', value: 'RS' },
      { label: 'RO', value: 'RO' },
      { label: 'RR', value: 'RR' },
      { label: 'SC', value: 'SC' },
      { label: 'SP', value: 'SP' },
      { label: 'SE', value: 'SE' },
      { label: 'TO', value: 'TO' }
    ];
  }

  protected createForm(login: Login): void {
    this.formCliente = this.formBuilder.group({
      login: [login.login, Validators.required],
      uf: [login.uf, Validators.required],
      password: [login.password, Validators.required],
      recaptcha: ['', !this.systemIntegration ? Validators.required : null]
    });
  }

  public handleReset(): void {
    this.formCliente?.reset();
  }

  public handleExpire(): void {
    console.log('reCaptcha expired');
  }

  public handleLoad(): void {
    console.log('reCaptcha loaded');
  }

  public handleSuccess(event: any): void {
    console.log('reCaptcha verified');
  }

  // public selectDoctor() {
  //   this.isDoctor = true;
  //   this.isPharmaceutical = false;
  // }

  // public selectPharmaceutical() {
  //   this.isDoctor = false;
  //   this.isPharmaceutical = true;
  // }

  public onSelectLoginMode(value: boolean): void {
    this.isPharmaceutical = value;
  }

  /**
   * Selecionar uf.
   * 
   * @param event 
   * @returns void 
   */
  public selecionarUf(event: any): void {
    this.uf = event.value;
  }
  
  public loginClick(): void {
    // this.valueIsNotNull(this.formCliente.value.login, this.invalidLogin);
    // this.valueIsNotNull(this.formCliente.value.uf, this.invalidUF);
    // this.valueIsNotNull(this.formCliente.value.password, this.invalidPassword);
    // this.valueIsNotNull(this.formCliente.value.recaptcha, this.invalidRecaptcha);

    this.valueIsNotNull(this.formCliente.value.login) ? this.invalidLogin = true : this.invalidLogin = false;
    this.valueIsNotNull(this.formCliente.value.uf) ? this.invalidUF = true : this.invalidUF = false;
    this.valueIsNotNull(this.formCliente.value.password) ? this.invalidPassword = true : this.invalidPassword = false;
    
    if (!this.systemIntegration) 
      if (!this.valueIsNotNull(this.formCliente.value.login) && !this.valueIsNotNull(this.formCliente.value.uf) && !this.valueIsNotNull(this.formCliente.value.password)) 
        this.valueIsNotNull(this.formCliente.value.recaptcha) ? this.invalidRecaptcha = true : this.invalidRecaptcha = false;

    if (this.formCliente.valid) {
      if (!this.isPharmaceutical) {
        // set cookie forDoctor
        this.cookieService.setCookie('forDoctor', 'true', 1);
        this.router.navigate(['prescricao-integracao']);
        window.localStorage.setItem('refresh', 'true');
      } else if (this.isPharmaceutical) {
        
      } else {
        this.showErrorViaToast('Erro', 'Ocorreu um erro ao realizar o login.');
      }
    }
  }

  private valueIsNotNull(value: any): boolean {
    return value == null || value === undefined || value === '';
  }

  /**
   * Verifica se o usuário está autenticado.
   * 
   * @returns boolean 
   */
  private userIsAuthenticated(): boolean {
    return this.cookieService.checkCookie('forDoctor');
  }

  // Recaptcha
  // »»» https://www.npmjs.com/package/ngx-captcha «««

  // ========== [ Toast ] ==========

  /**
   * Exibe uma mensagem de sucesso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showSuccessViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'success', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de informação.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showInfoViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'info', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de aviso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showWarnViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'warn', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de erro.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showErrorViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: summary, detail: datail });
  }

}
