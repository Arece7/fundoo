import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReminderComponent } from './main-reminder.component';

describe('MainReminderComponent', () => {
  let component: MainReminderComponent;
  let fixture: ComponentFixture<MainReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
