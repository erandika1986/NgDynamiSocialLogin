import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamiSocialLoginComponent } from './ng-dynami-social-login.component';

describe('NgDynamiSocialLoginComponent', () => {
  let component: NgDynamiSocialLoginComponent;
  let fixture: ComponentFixture<NgDynamiSocialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDynamiSocialLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamiSocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
