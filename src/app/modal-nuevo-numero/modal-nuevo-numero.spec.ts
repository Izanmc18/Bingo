import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoNumero } from './modal-nuevo-numero';

describe('ModalNuevoNumero', () => {
  let component: ModalNuevoNumero;
  let fixture: ComponentFixture<ModalNuevoNumero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNuevoNumero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevoNumero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
