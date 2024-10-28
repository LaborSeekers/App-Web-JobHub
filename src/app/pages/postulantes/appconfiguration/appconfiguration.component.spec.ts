import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppconfigurationComponent } from './appconfiguration.component';

describe('AppconfigurationComponent', () => {
  let component: AppconfigurationComponent;
  let fixture: ComponentFixture<AppconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppconfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
