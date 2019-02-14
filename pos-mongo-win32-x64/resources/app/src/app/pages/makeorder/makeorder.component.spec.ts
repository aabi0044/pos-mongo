import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeorderComponent } from './makeorder.component';

describe('MakeorderComponent', () => {
  let component: MakeorderComponent;
  let fixture: ComponentFixture<MakeorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
