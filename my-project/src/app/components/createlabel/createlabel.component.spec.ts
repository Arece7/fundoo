import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelabelComponent } from './createlabel.component';

describe('CreatelabelComponent', () => {
  let component: CreatelabelComponent;
  let fixture: ComponentFixture<CreatelabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
