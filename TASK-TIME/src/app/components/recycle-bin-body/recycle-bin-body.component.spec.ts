import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleBinBodyComponent } from './recycle-bin-body.component';

describe('RecycleBinBodyComponent', () => {
  let component: RecycleBinBodyComponent;
  let fixture: ComponentFixture<RecycleBinBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecycleBinBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecycleBinBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
