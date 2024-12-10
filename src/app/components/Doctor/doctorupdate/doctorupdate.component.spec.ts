import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorupdateComponent } from './doctorupdate.component';

describe('DoctorupdateComponent', () => {
  let component: DoctorupdateComponent;
  let fixture: ComponentFixture<DoctorupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
