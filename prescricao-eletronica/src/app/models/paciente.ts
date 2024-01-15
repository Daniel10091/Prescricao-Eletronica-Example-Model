import { Endereco } from './endereco';
import { ResponsavelLegal } from './responsavelLegal';

export interface IPaciente {
  idPaciente?: string;
  nome?: string;
  nomeSocial?: string;
  cpf?: string;
  dataNascimento?: string;
  sexo?: string;
  email?: string;
  telefoneCelular?: string;
  telefoneFixo?: string;
  endereco?: Endereco;
  responsavelLegal?: ResponsavelLegal;
}

export class Paciente implements IPaciente {
  /**
   * @param idPaciente ID do paciente no seu sistema. Obrigatório.
   * @param nome Nome do paciente. Obrigatório.
   * @param nomeSocial Nome social do paciente.
   * @param cpf CPF do paciente.
   * @param dataNascimento Data de nascimento do paciente (formato ISO: YYYYMMDD).
   * @param sexo Sigla do sexo do paciente ('M' ou 'F').
   * @param email Email para contato (usado para enviar a receita por email).
   * @param telefoneCelular Telefone celular para contato (usado para enviar a receita por WhatsApp).
   * @param telefoneFixo Telefone fixo para contato.
   * @param endereco Endereço do paciente.
   * @param responsavelLegal Responsável legal do paciente.
   */
  constructor(
    public idPaciente?: string,
    public nome?: string,
    public nomeSocial?: string,
    public cpf?: string,
    public dataNascimento?: string,
    public sexo?: string,
    public email?: string,
    public telefoneCelular?: string,
    public telefoneFixo?: string,
    public endereco?: Endereco,
    public responsavelLegal?: ResponsavelLegal
  ) {}
}
