import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalbookingsComponent } from './totalbookings.component';

describe('TotalbookingsComponent', () => {
  let component: TotalbookingsComponent;
  let fixture: ComponentFixture<TotalbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalbookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
