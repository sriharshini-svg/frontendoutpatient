import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaildatesComponent } from './availdates.component';

describe('AvaildatesComponent', () => {
  let component: AvaildatesComponent;
  let fixture: ComponentFixture<AvaildatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaildatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaildatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
