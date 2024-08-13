import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConsultarClienteService } from './consultar-cliente.service';

const mockConsultarMciCliente = {
  codigoCliente: 0,
};

describe('ConsultarClienteService', () => {
  let consultarClienteService: ConsultarClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsultarClienteService],
    });
    consultarClienteService = TestBed.inject(ConsultarClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(consultarClienteService).toBeTruthy();
  });

  it('deve consultar mci do cliente', () => {
    consultarClienteService
      .consultarMciCliente({
        codigoCpf: 0,
      })
      .subscribe((resp) => {
        expect(resp.codigoCliente).toBe(0);
      });

    const req = httpMock.expectOne(
      '/api/cfe-mci/api/v1/consultarmci/WEB_CORRESPONDENTE_BANCARIO_CHAVEJ/por-cpf',
      'Consultar MCI por CPF',
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockConsultarMciCliente);

    httpMock.verify();
  });
});
