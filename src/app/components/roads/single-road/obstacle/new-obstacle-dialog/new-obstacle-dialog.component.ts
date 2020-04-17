import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ObstacleRequest} from '../../../../../models/obstacle-request';
import {ObstacleService} from '../../../../../services/obstacle.service';
import {HeightObstruction, Obstructions, WeightObstruction, WidthObstruction} from '../../../../../models/obstructions-model';
import {isNullOrUndefined} from 'util';

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
    obstructionTypes = ['HEIGHT', 'WEIGHT', 'WIDTH'];

    heightObstacleProfiles = ['LINE', 'SEMICIRCLE', 'QUARTER_CIRCLE'];
    heightObstacleTypes = ['OVERPASS', 'TUNNEL', 'DEVICE', 'CABLES', 'PIPE', 'OTHER'];
    weightObstacleSubtypes = ['BRIDGE', 'ESTACADE', 'OVERPASS', 'ZONE', 'OTHER'];
    widthObstacleSubtypes = ['TUNNEL', 'TREE', 'LAMP', 'SIGN', 'GANTRY', 'OTHER'];

    selectedObstructions = new FormControl([], Validators.required);

    constructor(public dialogRef: MatDialogRef<NewObstacleDialogComponent>,
                private formBuilder: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: NewObstacleDialogData,
                private obstacleService: ObstacleService,
                private snackBar: MatSnackBar) {
        this.roadId = data.roadId;
        this.roadName = data.roadName;
        this.formGroup = this.formBuilder.group({
            name: [[''], Validators.required],
            city: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            immovable: ['', Validators.required],
            milestone: ['', Validators.required],
            url: [''],
            comment: [''],
            heightLimit: new FormControl({value: '', disabled: true}, Validators.required),
            heightProfile: new FormControl({value: '', disabled: true}, Validators.required),
            heightRange: new FormControl({value: '', disabled: true}, Validators.required),
            heightSubtype: new FormControl({value: '', disabled: true}, Validators.required),
            weightSubtype: new FormControl({value: '', disabled: true}, Validators.required),
            weightMlc: new FormControl({value: '', disabled: true}, Validators.required),
            weightLimit: new FormControl({value: '', disabled: true}, Validators.required),
            widthSubtype: new FormControl({value: '', disabled: true}, Validators.required),
            widthLimits: new FormControl({value: '', disabled: true}, Validators.required),
            widthRanges: new FormControl({value: '', disabled: true}, Validators.required),
            widthSymmetric: new FormControl({value: '', disabled: true}, Validators.required)
        });
        this.selectedObstructions.valueChanges.subscribe(val => {
            if (isNullOrUndefined(val) || val.length === 0) {
                this.disableHeightForm();
                this.disableWeightForm();
                this.disableWidthForm();
            }

            if (val.includes('HEIGHT')) {
                this.formGroup.get('heightLimit').enable();
                this.formGroup.get('heightProfile').enable();
                this.formGroup.get('heightRange').enable();
                this.formGroup.get('heightSubtype').enable();
            } else {
                this.disableHeightForm();
            }

            if (val.includes('WEIGHT')) {
                this.formGroup.get('weightSubtype').enable();
                this.formGroup.get('weightMlc').enable();
                this.formGroup.get('weightLimit').enable();
            } else {
                this.disableWeightForm();
            }

            if (val.includes('WIDTH')) {
                this.formGroup.get('widthSubtype').enable();
                this.formGroup.get('widthLimits').enable();
                this.formGroup.get('widthRanges').enable();
                this.formGroup.get('widthSymmetric').enable();
            } else {
                this.disableWidthForm();
            }
        });
    }

    disableHeightForm() {
        this.formGroup.get('heightLimit').disable();
        this.formGroup.get('heightProfile').disable();
        this.formGroup.get('heightRange').disable();
        this.formGroup.get('heightSubtype').disable();
    }

    disableWeightForm() {
        this.formGroup.get('weightSubtype').disable();
        this.formGroup.get('weightMlc').disable();
        this.formGroup.get('weightLimit').disable();
    }

    disableWidthForm() {
        this.formGroup.get('widthSubtype').disable();
        this.formGroup.get('widthLimits').disable();
        this.formGroup.get('widthRanges').disable();
        this.formGroup.get('widthSymmetric').disable();
    }

    isFormValid(): boolean {
        return this.formGroup.valid && this.obstructions.length > 0;
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

    get heightProfile() {
        return this.formGroup.get('heightProfile');
    }

    get heightLimit() {
        return this.formGroup.get('heightLimit');
    }

    get heightRange() {
        return this.formGroup.get('heightRange');
    }

    get heightSubtype() {
        return this.formGroup.get('heightSubtype');
    }

    get weightSubtype() {
        return this.formGroup.get('weightSubtype');
    }

    get weightMlc() {
        return this.formGroup.get('weightMlc');
    }

    get weightLimit() {
        return this.formGroup.get('weightLimit');
    }

    get widthLimits() {
        return this.formGroup.get('widthLimits');
    }

    get widthSymmetric() {
        return this.formGroup.get('widthSymmetric');
    }

    get widthRanges() {
        return this.formGroup.get('widthRanges');
    }

    get widthSubtype() {
        return this.formGroup.get('widthSubtype');
    }

    get obstructions(): string[] {
        return isNullOrUndefined(this.selectedObstructions.value) ? [] : this.selectedObstructions.value;
    }

    getHeightObstruction(): HeightObstruction {
        return this.heightObstructionSelected() ?
            new HeightObstruction(
                this.heightLimit.value,
                this.heightProfile.value,
                this.heightRange.value,
                this.heightSubtype.value) : null;
    }

    getWeightObstruction(): WeightObstruction {
        return this.weightObstructionSelected() ?
            new WeightObstruction(
                this.weightLimit.value,
                this.weightMlc.value,
                this.weightSubtype.value) : null;
    }

    getWidthObstruction(): WidthObstruction {
        return this.widthObstructionSelected() ?
            new WidthObstruction(
                this.widthLimits.value.replace(/\s/g, '').split(','),
                this.widthRanges.value.replace(/\s/g, '').split(','),
                this.widthSymmetric.value,
                this.widthSubtype.value
            ) : null;
    }

    heightObstructionSelected(): boolean {
        return this.obstructions.includes('HEIGHT');
    }

    weightObstructionSelected(): boolean {
        return this.obstructions.includes('WEIGHT');
    }

    widthObstructionSelected(): boolean {
        return this.obstructions.includes('WIDTH');
    }

    addObstacle(formDirective: FormGroupDirective) {
        const heightObstruction = this.getHeightObstruction();
        const weightObstruction = this.getWeightObstruction();
        const widthObstruction = this.getWidthObstruction();
        const request = new ObstacleRequest(
            this.roadId,
            this.name.value,
            this.city.value,
            this.latitude.value,
            this.longitude.value,
            this.immovable.value,
            this.milestone.value,
            this.url.value,
            this.comment.value,
            new Obstructions(
                heightObstruction,
                weightObstruction,
                widthObstruction
            )
        );
        this.obstacleService.addObstacle(request).subscribe(
            obs => {
                this.snackBar.open(`Added new obstacle ${obs.id}`, 'OK', {
                    duration: 2000,
                    panelClass: ['blue-snackbar']
                });
                this.dialogRef.close();
            }
        );
    }
}
