import { Prescricao } from './prescricao';

export interface IRequestMessage {
  accessToken?: string;
  prescricao?: Prescricao;
}

export class RequestMessage implements IRequestMessage {
  /**
   * @param accessToken Token de acesso, padrão OAuth2, autenticando o seu sistema.
   * @param prescricao Dados da receita sendo gerada.
   */
  constructor(public accessToken?: string, public prescricao?: Prescricao) {}
  
  setToken(accessToken: string): void {
    this.accessToken = accessToken;
  }
}
