import { LocalAtendimento } from './localAtendimento';
import { Paciente } from './paciente';
import { Medicamento } from './medicamento';

export interface IPrescricao {
  localAtendimento?: LocalAtendimento;
  paciente?: Paciente;
  medicamentos?: Medicamento[];
}

export class Prescricao implements IPrescricao {
  /**
   * @param localAtendimento Local de atendimento.
   * @param paciente Paciente sendo atendido.
   * @param medicamentos Lista de medicamentos sendo prescritos.
   */
  constructor(
    public localAtendimento?: LocalAtendimento,
    public paciente?: Paciente,
    public medicamentos?: Medicamento[]
  ) {}
}
