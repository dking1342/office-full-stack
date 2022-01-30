import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpsComponent } from './form-emps.component';

describe('FormEmpsComponent', () => {
  let component: FormEmpsComponent;
  let fixture: ComponentFixture<FormEmpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEmpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
