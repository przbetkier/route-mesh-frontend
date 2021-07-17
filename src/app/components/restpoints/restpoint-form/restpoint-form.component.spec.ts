import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestpointFormComponent } from './restpoint-form.component';

describe('RestpointFormComponent', () => {
  let component: RestpointFormComponent;
  let fixture: ComponentFixture<RestpointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestpointFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
