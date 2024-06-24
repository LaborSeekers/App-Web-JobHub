import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertantesMensajeriaComponent } from './ofertantes-mensajeria.component';

describe('OfertantesMensajeriaComponent', () => {
  let component: OfertantesMensajeriaComponent;
  let fixture: ComponentFixture<OfertantesMensajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertantesMensajeriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertantesMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
