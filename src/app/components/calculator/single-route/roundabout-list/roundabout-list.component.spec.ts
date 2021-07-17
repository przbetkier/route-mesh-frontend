import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundaboutListComponent } from './roundabout-list.component';

describe('RoundaboutListComponent', () => {
  let component: RoundaboutListComponent;
  let fixture: ComponentFixture<RoundaboutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundaboutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundaboutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
