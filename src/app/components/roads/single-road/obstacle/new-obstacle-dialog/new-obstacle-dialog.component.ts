import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {HeightObstacleRequest} from '../../../../../models/height-obstacle-request';
import {ObstacleService} from '../../../../../services/obstacle.service';

export interface NewObstacleDialogData {
  roadId: number;
  roadName: string;
}

@Component({
  selector: 'app-new-obstacle-dialog',
  templateUrl: './new-obstacle-dialog.component.html',
  styleUrls: ['./new-obstacle-dialog.component.css']
})
export class NewObstacleDialogComponent {

  formGroup: FormGroup;
  roadId: number;
  roadName: string;
  obstacleTypes = ['HEIGHT'];

  heightObstacleProfiles = ['LINE', 'SEMICIRCLE', 'QUARTER_CIRCLE'];
  heightObstacleTypes = ['OVERPASS', 'TUNNEL', 'DEVICE', 'CABLES', 'PIPE', 'OTHER'];

  constructor(public dialogRef: MatDialogRef<NewObstacleDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: NewObstacleDialogData,
              private obstacleService: ObstacleService,
              private snackBar: MatSnackBar) {
    this.roadId = data.roadId;
    this.roadName = data.roadName;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      immovable: ['', Validators.required],
      milestone: ['', Validators.required],
      url: ['', Validators.required],
      comment: [''],
      obstacleType: ['', Validators.required],
      limit: ['', Validators.required],
      heightProfile: ['', Validators.required],
      range: ['', Validators.required],
      heightObstacleType: ['', Validators.required]
    });
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  get name() {
    return this.formGroup.get('name');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get latitude() {
    return this.formGroup.get('latitude');
  }

  get longitude() {
    return this.formGroup.get('longitude');
  }

  get immovable() {
    return this.formGroup.get('immovable');
  }

  get milestone() {
    return this.formGroup.get('milestone');
  }

  get url() {
    return this.formGroup.get('url');
  }

  get comment() {
    return this.formGroup.get('comment');
  }

  get obstacleType() {
    return this.formGroup.get('obstacleType');
  }

  get heightProfile() {
    return this.formGroup.get('heightProfile');
  }

  get limit() {
    return this.formGroup.get('limit');
  }

  get range() {
    return this.formGroup.get('range');
  }

  get heightObstacleType() {
    return this.formGroup.get('heightObstacleType');
  }

  addObstacle(formDirective: FormGroupDirective) {
    if (this.obstacleType.value === 'HEIGHT') {
      const request = new HeightObstacleRequest(
        this.roadId,
        this.name.value,
        this.city.value,
        this.latitude.value,
        this.longitude.value,
        this.immovable.value,
        this.milestone.value,
        this.url.value,
        this.comment.value,
        this.obstacleType.value,
        this.limit.value,
        this.heightProfile.value,
        this.range.value,
        this.heightObstacleType.value
      );
      this.obstacleService.addHeightObstacle(request).subscribe(
        obs => {
          console.log('Added new obstacle ' + obs.id);
          this.snackBar.open(`Added new obstacle ${obs.id}`, 'OK', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
    }
  }

}
