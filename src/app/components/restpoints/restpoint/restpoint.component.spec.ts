import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestpointComponent } from './restpoint.component';

describe('RestpointComponent', () => {
  let component: RestpointComponent;
  let fixture: ComponentFixture<RestpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
