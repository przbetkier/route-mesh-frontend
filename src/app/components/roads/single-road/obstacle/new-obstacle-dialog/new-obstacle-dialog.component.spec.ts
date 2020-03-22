import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObstacleDialogComponent } from './new-obstacle-dialog.component';

describe('NewObstacleDialogComponent', () => {
  let component: NewObstacleDialogComponent;
  let fixture: ComponentFixture<NewObstacleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewObstacleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObstacleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
