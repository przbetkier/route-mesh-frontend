import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadListNumberComponent } from './road-list-number.component';

describe('RoadListNumberComponent', () => {
  let component: RoadListNumberComponent;
  let fixture: ComponentFixture<RoadListNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadListNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadListNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
