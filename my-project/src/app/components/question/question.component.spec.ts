import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { Note } from '../../core/Model/note';
import { Router } from '@angular/router';
import {Location} from "@angular/common";

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let location: Location;
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const response:Note[]=[];
    component.getNoteDetails();
    expect(component.note).toEqual(response);
  });

  it('should create', () => {
    component.close();
    router.navigate(['']);
    expect(location.path()).toBe('/dahboard');

  });
});
