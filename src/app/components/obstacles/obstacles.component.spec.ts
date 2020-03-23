import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstaclesComponent } from './obstacles.component';

describe('ObstaclesComponent', () => {
  let component: ObstaclesComponent;
  let fixture: ComponentFixture<ObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
