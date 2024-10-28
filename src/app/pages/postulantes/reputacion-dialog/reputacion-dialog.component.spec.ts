import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputacionDialogComponent } from './reputacion-dialog.component';

describe('ReputacionDialogComponent', () => {
  let component: ReputacionDialogComponent;
  let fixture: ComponentFixture<ReputacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReputacionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReputacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
