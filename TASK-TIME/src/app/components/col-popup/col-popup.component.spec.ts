import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColPopupComponent } from './col-popup.component';

describe('ColPopupComponent', () => {
  let component: ColPopupComponent;
  let fixture: ComponentFixture<ColPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
