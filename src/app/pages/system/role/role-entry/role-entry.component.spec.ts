import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEntryComponent } from './role-entry.component';

describe('RoleEntryComponent', () => {
  let component: RoleEntryComponent;
  let fixture: ComponentFixture<RoleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
