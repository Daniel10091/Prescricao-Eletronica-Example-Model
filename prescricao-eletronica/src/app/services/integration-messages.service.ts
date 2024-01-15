import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CfmRequestMessage, CfmResponseMessage } from '@conselho-federal-de-medicina/integracao-prescricao-cfm';

@Injectable({
  providedIn: 'root'
})
export class IntegrationMessagesService {

  private _message$ = new Subject<CfmRequestMessage>();

  private eventListener: any = null;

  public parentWindow: any = null;

  public eventOrigin?: string;

  constructor() { }

  get message$(): Observable<CfmRequestMessage> {
    return this._message$.asObservable();
  }

  startReceivingMessages() {
    if (this.eventListener != null) {
      this.stopReceivingMessages();
    }
    this.eventListener = this.captureMessage.bind(this);
    window.addEventListener('message', this.eventListener);
  }

  stopReceivingMessages() {
    if (this.eventListener == null) {
      console.warn("stopReceivingMessages called when no event listener was created");
      return;
    }
    window.removeEventListener('message', this.eventListener);
    this.eventListener = null;
  }

  private captureMessage(event: any) {
    this.eventOrigin = event.origin;
    
    if (event.origin !== 'http://127.0.0.1:5500') {
      // Verifica se a mensagem vem de uma origem confiável
      console.warn("Received message from unknown origin: " + event.origin);
      return;
    }

    console.log(">>>>>>>>>>>>>>");
    console.log(event);
    console.log(">>>>>>>>>>>>>>");

    this.parentWindow = event.source;

    this._message$.next(event.data);

    
    // this.parentWindow.postMessage('Mensagem recebida!');
    
  }

  // eventListener(event: any) {
  //   if (event.origin !== window.location.origin) {
  //       // Verifica se a mensagem vem de uma origem confiável
  //       return;
  //   }

  //   // Processa a mensagem recebida
  //   console.log('Mensagem recebida:', event.data);
  // }

  postMessage(message: CfmResponseMessage) {
    if (this.parentWindow == null) {
      console.warn("postMessage called when no parent window was set");
      return;
    }
    this.parentWindow.postMessage(message, this.eventOrigin);
  }

  sendPrescription(prescription: CfmRequestMessage) {
    // this._message$.next(prescription);
  }

}
