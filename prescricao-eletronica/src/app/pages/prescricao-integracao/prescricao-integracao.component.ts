import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Message, MessageService, SelectItem } from 'primeng/api';

import { Endereco } from 'src/app/models/endereco';
import { LocalAtendimento } from 'src/app/models/localAtendimento';
import { Medicamento } from 'src/app/models/medicamento';
import { Paciente } from 'src/app/models/paciente';
import { Prescricao } from 'src/app/models/prescricao';
import { RequestMessage } from 'src/app/models/requestMessage';
import { ResponsavelLegal } from 'src/app/models/responsavelLegal';
import { CookieService } from 'src/app/services/cookie.service';

import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

@Component({
  selector: 'app-prescricao-integracao',
  templateUrl: './prescricao-integracao.component.html',
  styleUrls: ['./prescricao-integracao.component.scss'],
  providers: [ IntegrationMessagesService, MessageService ]
})
export class PrescricaoIntegracaoComponent implements OnInit {

  // Utils
  addMedicamento = false;
  msgs: Message[] = [];
  viewPrescription: boolean = false;

  // UI
  @ViewChild('addMedicamentoButtom') addMedicamentoButtom?: ElementRef;

  // Paciente UI
  pacientes: SelectItem[] = [];
  selectedPacienteDrop: SelectItem[] = [];

  // Local de atendimento UI
  locaisAtendimento: SelectItem[] = [];
  selectedLocalAtendimentoDrop: SelectItem[] = [];

  // Medicamento UI
  medicamentos: SelectItem[] = [];
  filteredMedicamentos: SelectItem[] = [];
  selectedMedicamentoDrop: SelectItem[] = [];

  // Paciente
  paciente: SelectItem = { value: '' };
  
  // Medicamentos
  medicamentosFiltrados: Medicamento[] = new Array<Medicamento>();
  medicamentoSelecionado: Medicamento = new Medicamento();
  medicamentosSelecionados: Medicamento[] = new Array<Medicamento>();
  medicamentoFiltered: Medicamento = new Medicamento();
  medicamento: Medicamento = new Medicamento();
  
  // Local de atendimento
  localAtendimento: SelectItem = { value: '' };

  // Prescrição
  prescricao?: Prescricao;

  // Request message
  requestMessage?: RequestMessage;

  // View prescription
  prescriptionToView: Prescricao = new Prescricao();
  
  constructor(
    private service: MessageService,
    private integrationMessagesService: IntegrationMessagesService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (!this.userIsAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.init();
    }

    if (window.localStorage.getItem('refresh') == 'true') {
      window.localStorage.setItem('refresh', 'false');
      window.location.reload();
    }

    if (window.opener) {
      this.integrationMessagesService.parentWindow = window.opener;
    }
    
    let endereco = new Endereco(
      '1',
      '74000000',
      'GO',
      'Goiânia',
      'Centro',
      'Rua 1',
      '1',
      'Sem complemento'
    );

    // Inicializa paciente e loca de atendimento
    this.requestMessage = new RequestMessage(
      '',
      new Prescricao(
        new LocalAtendimento('1', 'logo', 'Clínica Aparência', endereco, 'email@gmail.com', '62999999999', '6233333333'),
        new Paciente('1', 'Daniel', 'Natália', '02320121056', '2001-05-04', 'M', 'daniel@gmail.com', '62999999999', '6233333333', new Endereco(), new ResponsavelLegal()),
        [
          // new Medicamento('662', false, 'amoxilina', '2mg', 2, 'Tomar diariamente.'),
          // new Medicamento('590', false, 'DIPIRONA SODICA', '3mg', 3, 'Tomar diariamente.'),
          // new Medicamento('461', false, 'DIPRIVAN', '3mg', 3, 'Tomar diariamente.'),
          // new Medicamento('587', false, 'rivotril', '4mg', 4, 'Tomar diariamente.')
        ]
      )
    );

    this.prescricao = this.requestMessage.prescricao;

    let pacienteNome = this.prescricao!.paciente!.nomeSocial ? this.prescricao!.paciente!.nomeSocial! : this.prescricao!.paciente!.nome!;
    
    this.prescricao!.paciente!.cpf! = this.prescricao!.paciente!.cpf!.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    this.paciente = { label: this.prescricao!.paciente!.cpf! + ' - ' + pacienteNome, value: this.prescricao!.paciente! };
    this.pacientes = [ this.paciente ];
    
    this.localAtendimento = { label: this.prescricao!.localAtendimento!.nome!, value: this.prescricao!.localAtendimento! };
    this.locaisAtendimento = [ this.localAtendimento ];

    [
      {
        "idMedicamento": 662,
        "nome": "amoxilina",
        "medicoId": 129
      },
      {
        "idMedicamento": 590,
        "nome": "DIPIRONA SODICA",
        "medicoId": 129
      },
      {
        "idMedicamento": 461,
        "nome": "DIPRIVAN",
        "medicoId": 129
      },
      {
        "idMedicamento": 587,
        "nome": "rivotril",
        "medicoId": 129
      },
    ].forEach((medicamento: any) => {
      let medicamentoNome = medicamento.nome;
      this.medicamentos.push({ label: medicamentoNome, value: medicamento });
    });

    // this.medicamentos.push(
    //   { label: 'Amoxcilina', value: { id: 1, nome: 'Amoxcilina', medicoId: 129 } },
    //   { label: 'Dipirona', value: { id: 2, nome: 'Dipirona', medicoId: 129 } },
    //   { label: 'Rivotril', value: { id: 3, nome: 'Rivotril', medicoId: 129 } }
    // );

    // Inicializa a lista de medicamentos selecionados.
    this.medicamentosSelecionados = this.prescricao!.medicamentos!;
    
  }

  // ========== [ Medicamento ] ==========

  /**
   * Abre/fecha add medicamento box.
   * 
   * @param value 
   * @returns void
   */
  public toggleAddMedicamentoBox(value: boolean): void {
    if (this.addMedicamentoButtom?.nativeElement.classList.contains('warning-alert'))
      this.addMedicamentoButtom?.nativeElement.classList.remove('warning-alert');
    
    this.addMedicamento = value;
  }

  /**
   * Filtra medicamentos.
   * 
   * @param event 
   * @returns void 
   */
  public filterMedicamento(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.medicamentos.length; i++) {
      const medicamento = this.medicamentos[i];
      if (medicamento.label!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(medicamento);
      }
    }

    this.filteredMedicamentos = filtered;
    this.medicamento = this.filteredMedicamentos[0].value;
  }

  /**
   * Abre a box e cria uma instância de {@link Medicamento} para popular um novo medicamento.
   * 
   * @returns void 
   */
  public newMedicamento(): void {
    this.toggleAddMedicamentoBox(true);
    this.medicamento = new Medicamento();
  }
  
  /**
   * Abre a box para editar um medicamento.
   * 
   * @param medicamento 
   * @returns void 
   */
  public editMedicamento(medicamento: Medicamento): void {
    this.toggleAddMedicamentoBox(true);
    this.medicamento = medicamento;
  }

  /**
   * Adiciona um medicamento. Se o medicamento já existir na lista de medicamentos selecionados, atualiza-o. Caso contrário, adiciona-o.
   * 
   * @param medicamento 
   * @returns void 
   */
  public adicionarMedicamento(medicamento: Medicamento): void {
    if (this.valueIsNotNull(medicamento.nome) && this.valueIsNotNull(medicamento.quantidade)) {
      if (this.medicamentosSelecionados.filter((medicamentoSelecionado) => {
        return medicamentoSelecionado.idMedicamento == medicamento.idMedicamento;
      }).length == 0) {
        this.setMedicamentos(medicamento);
      } else {
        this.setUpdatedMedicamento(medicamento);
      }

      this.toggleAddMedicamentoBox(false);
    
      this.medicamento = new Medicamento();
      this.medicamentoSelecionado = new Medicamento();
      this.selectedMedicamentoDrop = [];
      
    } else {
      this.showErrorViaToast('Não é possível adicionar o medicamento', 'Preencha os campos obrigatórios.');
    }
  }

  /**
   * Adiciona um medicamento na lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public setMedicamentos(medicamento: Medicamento): void {
    this.medicamentosSelecionados.push(medicamento);
    console.log(this.medicamentosSelecionados);
  }

  /**
   * Atualiza um medicamento na lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public setUpdatedMedicamento(medicamento: Medicamento): void {
    this.medicamentosSelecionados = this.medicamentosSelecionados.map((medicamentoSelecionado) => {
      if (medicamentoSelecionado.idMedicamento === medicamento.idMedicamento) {
        return medicamento;
      } else {
        return medicamentoSelecionado;
      }
    });
  }

  /**
   * Remove um medicamento da lista de medicamentos selecionados.
   * 
   * @param medicamento 
   * @returns void 
   */
  public deleteMedicamento(medicamento: Medicamento): void {
    this.medicamentosSelecionados = this.medicamentosSelecionados.filter((medicamentoSelecionado) => {
      return medicamentoSelecionado.idMedicamento !== medicamento.idMedicamento;
    });
  }

  /**
   * Altera o valor da propriedade {@link Medicamento.informacoes} de um medicamento.
   * 
   * @param event 
   * @returns void 
   */
  public changeMedicamentoInformacao(event: any): void {
    this.medicamento.informacoes = event.target.value;
  }

  // ========== [ Prescrição ] ==========

  public viewPrescricao(): void {
    this.prescriptionToView = {
      localAtendimento: this.localAtendimento.value,
      paciente: {
        nome: this.paciente.value.nome,
        nomeSocial: this.paciente.value.nomeSocial,
        cpf: this.paciente.value.cpf,
        dataNascimento: this.paciente.value.dataNascimento,
        sexo: this.paciente.value.sexo,
        email: this.paciente.value.email,
        telefoneCelular: this.paciente.value.telefoneCelular,
        telefoneFixo: this.paciente.value.telefoneFixo,
        endereco: this.paciente.value.endereco,
        responsavelLegal: this.paciente.value.responsavelLegal
      },
      medicamentos: this.medicamentosSelecionados
    };

    this.prescriptionToView.paciente!.cpf = this.prescriptionToView.paciente!.cpf!.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    this.prescriptionToView.paciente!.dataNascimento = this.prescriptionToView.paciente!.dataNascimento!.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    this.prescriptionToView.paciente!.telefoneCelular = this.prescriptionToView.paciente!.telefoneCelular!.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    this.prescriptionToView.paciente!.telefoneFixo = this.prescriptionToView.paciente!.telefoneFixo!.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    this.prescriptionToView.localAtendimento!.endereco!.cep! = this.prescriptionToView.localAtendimento!.endereco!.cep!.replace(/(\d{5})(\d{3})/, '$1-$2');
    this.prescriptionToView.localAtendimento!.telefoneCelular = this.prescriptionToView.localAtendimento!.telefoneCelular!.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    this.prescriptionToView.localAtendimento!.telefoneFixo = this.prescriptionToView.localAtendimento!.telefoneFixo!.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

    setTimeout(() => {
      this.viewPrescription = true;
    }, 200);
  }

  /**
   * Envia a prescrição.
   * 
   * @returns void 
   */
  public async sendPrescription(): Promise<void> {
    if (this.medicamentosSelecionados.length === 0) {
      this.addMedicamentoButtom?.nativeElement.classList.add('warning-alert');
      this.showWarnViaToast('Não é possível continuar', 'É necessário selecionar pelo menos um medicamento.');
      return;
    }

    this.prescricao = new Prescricao(this.localAtendimento.value, this.paciente.value, this.medicamentosSelecionados);
    this.requestMessage = new RequestMessage(undefined, this.prescricao);

    console.log(this.requestMessage);

    this.showSuccessViaToast('Prescrição enviada', 'A prescrição foi enviada com sucesso.');

    // this.integrationMessagesService.parentWindow.postMessage(this.requestMessage);
    // this.integrationMessagesService.message$.subscribe((message: any) => {
    //   console.log(message);
    // });
  }
  
  // ========== [ Utils ] ==========

  /**
   * Verifica se um valor é diferente de nulo, indefinido ou vazio.
   * 
   * @param value 
   * @returns boolean 
   */
  private valueIsNotNull(value: any): boolean {
    return value != null && value != undefined && value != '';
  }

  // ========== [ Toast ] ==========

  /**
   * Exibe uma mensagem de sucesso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showSuccessViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'success', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de informação.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showInfoViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'info', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de aviso.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showWarnViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'warn', summary: summary, detail: datail });
  }

  /**
   * Exibe uma mensagem de erro.
   * 
   * @param summary 
   * @param datail 
   * @returns void 
   */
  private showErrorViaToast(summary: string, datail: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: summary, detail: datail });
  }

  // ========== [ Login ] ==========

  /**
   * Verifica se o usuário está autenticado.
   * 
   * @returns boolean 
   */
  private userIsAuthenticated(): boolean {
    return this.cookieService.checkCookie('forDoctor');
  }
  
  /**
   * Faz logout.
   * 
   * @returns void 
   */
  public logoutClick(): void {
    this.cookieService.deleteCookie('forDoctor');
    this.router.navigate(['login']);
  }

  // ========== [ Integration ] ==========

  /**
   * Inicializa o serviço de integração.
   * 
   * @returns void 
   */
  private init(): void {
    this.integrationMessagesService.message$.subscribe((message: any) => {
      console.log(message);
    });
  }

  /**
   * Codifica a mensagem de requisição.
   * 
   * @param requestMessage 
   * @returns string 
   */
  private encodeRequestMessage(requestMessage: RequestMessage): string {
    return btoa(JSON.stringify(requestMessage));
  }

  /**
   * Decodifica a mensagem de resposta.
   * 
   * @param responseMessage 
   * @returns string 
   */
  private decodeResponseMessage(responseMessage: string): string {
    return atob(responseMessage);
  }

}
