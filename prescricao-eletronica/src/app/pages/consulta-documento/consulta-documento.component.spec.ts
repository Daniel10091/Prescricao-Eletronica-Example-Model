import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDocumentoComponent } from './consulta-documento.component';

describe('ConsultaDocumentoComponent', () => {
  let component: ConsultaDocumentoComponent;
  let fixture: ComponentFixture<ConsultaDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaDocumentoComponent]
    });
    fixture = TestBed.createComponent(ConsultaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
