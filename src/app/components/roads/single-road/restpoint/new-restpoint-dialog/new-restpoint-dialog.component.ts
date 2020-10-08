import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {NewObstacleDialogData} from '../../obstacle/new-obstacle-dialog/new-obstacle-dialog.component';
import {RestpointService} from '../../../../../services/restpoint.service';

export interface NewRestpointDialogData {
  roadId: number;
  roadName: string;
}

@Component({
  selector: 'app-new-restpoint-dialog',
  templateUrl: './new-restpoint-dialog.component.html',
  styleUrls: ['./new-restpoint-dialog.component.css']
})
export class NewRestpointDialogComponent implements OnInit {

  roadId: number;
  roadName: string;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewRestpointDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: NewRestpointDialogData,
              private restpointService: RestpointService,
              private snackBar: MatSnackBar) {
    this.roadId = data.roadId;
    this.roadName = data.roadName;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      milestone: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  get name() {
    return this.formGroup.get('name');
  }

  get latitude() {
    return this.formGroup.get('latitude');
  }

  get longitude() {
    return this.formGroup.get('longitude');
  }

  get milestone() {
    return this.formGroup.get('milestone');
  }

  get width() {
    return this.formGroup.get('width');
  }

  get length() {
    return this.formGroup.get('length');
  }


  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  addRestPoint(formDirective: FormGroupDirective) {
    const request = new RestPointRequest(
      this.roadId,
      this.name.value,
      this.latitude.value,
      this.longitude.value,
      this.milestone.value,
      this.width.value,
      this.length.value
    );

    console.log({req: request});
    this.restpointService.addRestPoint(request).subscribe(
      res => {
        this.snackBar.open(`Added new restpoint.`, 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.dialogRef.close();
      }, () => {
        this.snackBar.open(`Sorry! Something went wrong!`, 'OK', {
          duration: 2000,
          panelClass: ['red-snackbar']
        });
      }
    );


  }

}

export class RestPointRequest {
  constructor(public roadId: number,
              public name: string,
              public latitude: number,
              public longitude: number,
              public milestone: number,
              public width: number,
              public length: number) {
  }
}
