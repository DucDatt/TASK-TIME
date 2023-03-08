import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredBodyComponent } from './starred-body.component';

describe('StarredBodyComponent', () => {
  let component: StarredBodyComponent;
  let fixture: ComponentFixture<StarredBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarredBodyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StarredBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
