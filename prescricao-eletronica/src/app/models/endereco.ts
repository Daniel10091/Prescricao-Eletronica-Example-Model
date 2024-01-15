export interface IEndereco {
  id?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
}

export class Endereco implements IEndereco {
  /**
   * @param id ID do endereço no seu sistema.
   * @param cep CEP (somente números).
   * @param uf Sigla do estado. Obrigatório.
   * @param cidade Nome da cidade. Obrigatório.
   * @param bairro Nome do bairro.
   * @param logradouro Logradouro. Obrigatório.
   * @param numero Número.
   * @param complemento Complemento.
   */
  constructor(
    public id?: string,
    public cep?: string,
    public uf?: string,
    public cidade?: string,
    public bairro?: string,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string
  ) {}
}
