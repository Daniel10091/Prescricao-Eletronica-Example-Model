export interface IResponsavelLegal {
  nome?: string;
  cpf?: string;
}

export class ResponsavelLegal implements IResponsavelLegal {
  /**
   * @param nome Nome do responsável legal. Obrigatório.
   * @param cpf CPF do responsável legal.
   */
  constructor(public nome?: string, public cpf?: string) {}
}
