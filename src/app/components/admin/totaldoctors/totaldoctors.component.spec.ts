import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaldoctorsComponent } from './totaldoctors.component';

describe('TotaldoctorsComponent', () => {
  let component: TotaldoctorsComponent;
  let fixture: ComponentFixture<TotaldoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotaldoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotaldoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
