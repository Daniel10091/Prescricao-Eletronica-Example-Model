import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoIntegracaoComponent } from './prescricao-integracao.component';

describe('PrescricaoIntegracaoComponent', () => {
  let component: PrescricaoIntegracaoComponent;
  let fixture: ComponentFixture<PrescricaoIntegracaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescricaoIntegracaoComponent]
    });
    fixture = TestBed.createComponent(PrescricaoIntegracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
