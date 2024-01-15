export interface IMedicamento {
  idMedicamento?: string;
  manipulado?: boolean;
  nome?: string;
  concentracao?: string;
  quantidade?: number;
  informacoes?: string;
}

export class Medicamento implements IMedicamento {
  /**
   * @param idMedicamento ID do medicamento no seu sistema. Opcional.
   * @param manipulado Se o medicamento é manipulado ou não.
   * @param nome Nome do medicamento. Obrigatório.
   * @param concentracao Concentração (ex: 5mg).
   * @param quantidade Quantidade (ex: 10). Obrigatório para industrializados.
   * @param informacoes Descrição da fórmula, administração, posologia, duração do tratamento e outras informações. Obrigatório para manipulados.
   */
  constructor(
    public idMedicamento?: string,
    public manipulado?: boolean,
    public nome?: string,
    public concentracao?: string,
    public quantidade?: number,
    public informacoes?: string
  ) {}
}
