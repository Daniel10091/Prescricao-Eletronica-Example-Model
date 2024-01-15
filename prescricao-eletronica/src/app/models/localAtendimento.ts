import { Endereco } from './endereco';

export interface ILocalAtendimento {
  idLocal?: string;
  logo?: string;
  nome?: string;
  endereco?: Endereco;
  email?: string;
  telefoneCelular?: string;
  telefoneFixo?: string;
}

export class LocalAtendimento implements ILocalAtendimento {
  /**
   * @param idLocal ID do local de atendimento no seu sistema. Obrigatório.
   * @param logo Imagem PNG ou JPG com no máximo 200kB.
   * @param nome Nome do local de atendimento. Obrigatório.
   * @param endereco Endereço do local de atendimento.
   * @param email Email para contato.
   * @param telefoneCelular Telefone celular para contato.
   * @param telefoneFixo Telefone fixo para contato.
   */
  constructor(
    public idLocal?: string,
    public logo?: string,
    public nome?: string,
    public endereco?: Endereco,
    public email?: string,
    public telefoneCelular?: string,
    public telefoneFixo?: string
  ) {}
}
