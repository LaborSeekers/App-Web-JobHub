import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCurriculumComponent } from './editar-curriculum.component';

describe('EditarCurriculumComponent', () => {
  let component: EditarCurriculumComponent;
  let fixture: ComponentFixture<EditarCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCurriculumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
