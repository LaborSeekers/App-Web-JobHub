import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertantesComponent } from './ofertantes.component';

describe('OfertantesComponent', () => {
  let component: OfertantesComponent;
  let fixture: ComponentFixture<OfertantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
