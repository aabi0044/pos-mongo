import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpnameComponent } from './helpname.component';

describe('HelpnameComponent', () => {
  let component: HelpnameComponent;
  let fixture: ComponentFixture<HelpnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
