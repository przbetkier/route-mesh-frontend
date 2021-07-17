import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestpointListComponent } from './restpoint-list.component';

describe('RestpointListComponent', () => {
  let component: RestpointListComponent;
  let fixture: ComponentFixture<RestpointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestpointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
