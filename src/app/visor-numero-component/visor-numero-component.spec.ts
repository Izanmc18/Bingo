import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorNumeroComponent } from './visor-numero-component';

describe('VisorNumeroComponent', () => {
  let component: VisorNumeroComponent;
  let fixture: ComponentFixture<VisorNumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorNumeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorNumeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
