import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessRequestService {

  private serverUrl = 'https://api.teste.goias.med.br';

  private authUrl: string = 'https://auth-hom.cfm.org.br/realms/CFM/protocol/openid-connect/token';

  constructor(
    private http: HttpClient
  ) { }

  public getToken(): Observable<any> {
    const body = new URLSearchParams();

    body.set('grant_type', 'client_credentials');
    body.set('client_id', 'external-ses-go');
    body.set('client_secret', 'SBa9zkrF304S2J4emtoLMSAejGsnFeiu');
    body.set('scope', 'openid');
    
    return this.http.post(this.authUrl, body.toString(), {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(map((data: any) => {
      console.log(data);
      
      return data.access_token;
    }));
  }

  public getAccessToken(): void {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', 'cfm-portal');
    body.set('client_secret', 'cfm-portal');
    body.set('scope', 'cfm-portal');

    this.http.post(this.authUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe((data: any) => {
      this.setAccessToken(data.access_token);
    });
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

}
