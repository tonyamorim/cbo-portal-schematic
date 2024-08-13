import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ConsultarMCIOutputV1 } from './consultar-cliente.models';
import { ConsultarClienteService } from './consultar-cliente.service';
import {
  CboFormBase,
  CboInlineMessageService,
  CboInlineMessageStatus,
  ICboInlineMessage,
} from 'cbo-portal-common-components';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css'],
})
export class ConsultarClienteComponent extends CboFormBase {
  msgAlert!: ICboInlineMessage;

  codigoCpf!: number;

  constructor(
    public override formBuilder: FormBuilder,
    private service: ConsultarClienteService,
    private alertaService: CboInlineMessageService,
  ) {
    super(formBuilder);
  }

  override ngOnInit(): void {
    this.inscAlertMsgs();
  }

  async consultar() {
    try {
      const resultado: ConsultarMCIOutputV1 = await lastValueFrom(
        this.service.consultarMciCliente({
          codigoCpf: this.codigoCpf,
        }),
      );
      if (resultado.codigoCliente > 0) {
        this.emitirAlerta({
          content: `O MCI desse CPF é: ${resultado.codigoCliente}`,
          title: 'Sucesso',
          status: CboInlineMessageStatus.SUCCESS,
        });
      } else {
        this.emitirAlerta({
          content: 'Sua pesquisa não retornou um MCI válido.',
          title: 'Erro',
          status: CboInlineMessageStatus.ERROR,
        });
      }
    } catch (error) {
      this.emitirErro(error);
    }
  }

  private emitirErro(error: any): void {
    this.emitirAlerta({
      content: error.errorMessage
        ? error.errorMessage
        : 'Erro na Requisição do Serviço.',
      title: 'Erro',
      status: CboInlineMessageStatus.ERROR,
      details: error.errorDetails ? error.errorDetails : [],
    });
  }

  private emitirAlerta(msg: ICboInlineMessage): void {
    this.alertaService.emitMsg(msg);
  }

  private inscAlertMsgs() {
    const msg$ = this.alertaService
      .getMsgEmit()
      .subscribe((msg) => (this.msgAlert = msg));
    this.inscricoes$.push(msg$);
  }
}
