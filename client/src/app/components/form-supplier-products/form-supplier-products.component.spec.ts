import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSupplierProductsComponent } from './form-supplier-products.component';

describe('FormSupplierProductsComponent', () => {
  let component: FormSupplierProductsComponent;
  let fixture: ComponentFixture<FormSupplierProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSupplierProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSupplierProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
