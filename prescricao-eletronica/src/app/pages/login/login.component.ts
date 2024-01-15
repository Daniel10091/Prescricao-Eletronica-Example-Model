import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel: any;
  public isDoctor: boolean = true;
  public isPharmaceutical: boolean = false;
  
  public invalidLogin: boolean = false;
  public invalidUF: boolean = false;
  public invalidPassword: boolean = false;
  
  protected aFormGroup: FormGroup = new FormGroup({});
  protected siteKey: string = '6Lc6Z8QZAAAAAEx4Z4Z4Z4Z4Z4Z4Z4Z4Z4Z4Z4Z4';

  public login?: string;
  public uf?: any;
  public password?: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  // »»» https://www.npmjs.com/package/ngx-captcha «««

  formGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    uf: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    recaptcha: new FormControl('', Validators.required)
  });

  private formConfig(): void {
    this.aFormGroup = this.formBuilder.group({
      login: ['', Validators.required],
      uf: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  public handleReset(): void {
    this.aFormGroup?.reset();
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

  public selectDoctor() {
    this.isDoctor = true;
    this.isPharmaceutical = false;
  }

  public selectPharmaceutical() {
    this.isDoctor = false;
    this.isPharmaceutical = true;
  }

  public onSelectLoginMode(): void {
    
  }
  
  public loginClick() {
    if (this.isDoctor) {
      console.log('Doctor');
    } else if (this.isPharmaceutical) {
      console.log('Pharmaceutical');
    } else {
      console.log('No selecciono nada');
    }
  }

}
