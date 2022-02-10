import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessageBoxComponent } from './view-message-box.component';

describe('ViewMessageBoxComponent', () => {
  let component: ViewMessageBoxComponent;
  let fixture: ComponentFixture<ViewMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMessageBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
