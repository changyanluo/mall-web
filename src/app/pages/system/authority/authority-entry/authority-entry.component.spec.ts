import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityEntryComponent } from './authority-entry.component';

describe('AuthorityEntryComponent', () => {
  let component: AuthorityEntryComponent;
  let fixture: ComponentFixture<AuthorityEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorityEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
