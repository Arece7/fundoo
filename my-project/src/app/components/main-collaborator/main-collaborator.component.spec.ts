import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCollaboratorComponent } from './main-collaborator.component';

describe('MainCollaboratorComponent', () => {
  let component: MainCollaboratorComponent;
  let fixture: ComponentFixture<MainCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
