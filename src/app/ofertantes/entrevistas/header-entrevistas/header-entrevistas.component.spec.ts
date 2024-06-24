import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntrevistasComponent } from './header-entrevistas.component';

describe('HeaderEntrevistasComponent', () => {
  let component: HeaderEntrevistasComponent;
  let fixture: ComponentFixture<HeaderEntrevistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderEntrevistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
