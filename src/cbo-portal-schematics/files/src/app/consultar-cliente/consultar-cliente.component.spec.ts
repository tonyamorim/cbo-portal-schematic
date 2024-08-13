import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BbCardModule, BbTextFieldModule } from 'dls-angular';
import { Observable, of } from 'rxjs';
import { ConsultarClienteComponent } from './consultar-cliente.component';
import { ConsultarClienteService } from './consultar-cliente.service';
import { CboCommonModule } from 'cbo-portal-common-lib';

const mockConsultarMciClienteRetornoZero = {
  codigoCliente: 0,
};

const mockConsultarMciClienteRetornoValido = {
  codigoCliente: 123456789,
};

const mockConsultarMciClienteErro = { errorMessage: 'Cpf deve ser informado' };

const mockConsultarMciClienteErroDetalhe = {
  errorMessage: 'Cpf deve ser informado',
  errorDetails: ['Só', 'linhas', 'de', 'detalhe'],
};

describe('ConsultarClienteComponent', () => {
  let consultarClienteServiceStub: Partial<ConsultarClienteService>;
  let component: ConsultarClienteComponent;
  let fixture: ComponentFixture<ConsultarClienteComponent>;

  beforeEach(waitForAsync(() => {
    consultarClienteServiceStub = {
      consultarMciCliente: (input): Observable<any> => {
        if (input.codigoCpf == 99) {
          throw {};
        } else if (input.codigoCpf == 98) {
          throw mockConsultarMciClienteErroDetalhe;
        } else if (input.codigoCpf == 0) {
          throw mockConsultarMciClienteErro;
        } else if (input.codigoCpf == 1) {
          return of(mockConsultarMciClienteRetornoValido);
        } else {
          return of(mockConsultarMciClienteRetornoZero);
        }
      },
    };

    TestBed.configureTestingModule({
      declarations: [ConsultarClienteComponent],
      providers: [
        {
          provide: ConsultarClienteService,
          useValue: consultarClienteServiceStub,
        },
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BbCardModule,
        CboCommonModule,
        BbTextFieldModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir erro quando CPF não encontrado', async () => {
    component.codigoCpf = -1;
    await component.consultar();
    expect(component.msgAlert.content).toEqual(
      'Sua pesquisa não retornou um MCI válido.',
    );
  });

  it('deve conseguir consultar cpf', async () => {
    component.codigoCpf = 1;
    await component.consultar();
    expect(component.msgAlert.content).toContain('O MCI desse CPF é');
  });

  it('deve emitir mensagem de erro, quando cpf não for informado', async () => {
    component.codigoCpf = 0;
    await component.consultar();
    expect(component.msgAlert.content).toEqual('Cpf deve ser informado');
  });

  it('deve emitir mensagem de erro genérica, quando não houver mensagem', async () => {
    component.codigoCpf = 99;
    await component.consultar();
    expect(component.msgAlert.content).toEqual(
      'Erro na Requisição do Serviço.',
    );
  });

  it('deve exibir detalhes do erro, quando houver', async () => {
    component.codigoCpf = 98;
    await component.consultar();
    expect(
      component.msgAlert.details && component.msgAlert.details.length > 0,
    ).toBeTruthy();
  });

  it('deve conseguir preencher cpf', async () => {
    const iCpf = fixture.debugElement.query(By.css('#codigoCpf')).nativeElement;
    iCpf.value = 1;
    iCpf.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.codigoCpf.toString()).toEqual('1');
  });
});
