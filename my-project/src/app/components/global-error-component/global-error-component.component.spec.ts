import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalErrorComponentComponent } from './global-error-component.component';

describe('GlobalErrorComponentComponent', () => {
  let component: GlobalErrorComponentComponent;
  let fixture: ComponentFixture<GlobalErrorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalErrorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalErrorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
