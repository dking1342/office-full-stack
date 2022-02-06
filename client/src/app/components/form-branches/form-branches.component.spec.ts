import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBranchesComponent } from './form-branches.component';

describe('FormBranchesComponent', () => {
  let component: FormBranchesComponent;
  let fixture: ComponentFixture<FormBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
