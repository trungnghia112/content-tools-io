import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBoxLoadingComponent } from './box-loading.component';

describe('SharedBoxLoadingComponent', () => {
  let component: SharedBoxLoadingComponent;
  let fixture: ComponentFixture<SharedBoxLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedBoxLoadingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBoxLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
