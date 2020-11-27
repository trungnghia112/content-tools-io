import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBoxNoDataComponent } from './box-nodata.component';

describe('SharedBoxNoDataComponent', () => {
  let component: SharedBoxNoDataComponent;
  let fixture: ComponentFixture<SharedBoxNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBoxNoDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBoxNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
