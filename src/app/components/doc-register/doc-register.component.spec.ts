import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRegistrationComponent } from './doc-register.component';

describe('DoctorRegistrationComponent', () => {
  let component: DoctorRegistrationComponent;
  let fixture: ComponentFixture<DoctorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
