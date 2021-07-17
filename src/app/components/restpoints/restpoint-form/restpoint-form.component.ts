import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Node} from '../../../models/node-model';
import {NodeService} from '../../../services/node.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RestpointRequest} from '../../../models/restpoint-request';
import {RestpointService} from '../../../services/restpoint.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-restpoint-form',
  templateUrl: './restpoint-form.component.html',
  styleUrls: ['./restpoint-form.component.css']
})
export class RestpointFormComponent implements OnInit {

  isLoading: boolean;
  nodeId: number;
  node: Node;
  processing = false;
  formGroup: FormGroup;
  restpointTypes = ['PRIVATE', 'LAY_BY', 'REST_AREA'];

  constructor(private route: ActivatedRoute, private nodeService: NodeService,
              private formBuilder: FormBuilder, private restpointService: RestpointService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.nodeId = Number(params.get('nodeId'));

        this.nodeService.getNode(this.nodeId).subscribe(
          data => {
            this.node = data;
            this.isLoading = false;

            this.formGroup = this.formBuilder.group({
              restpointType: ['', Validators.required],
              roadNumber: ['', Validators.required],
              milestone: ['', Validators.required],
              generalSlots: ['', Validators.required],
              occupancy: ['', Validators.required],
              slotLength: ['', Validators.required],
              slotWidth: ['', Validators.required],
              hazardousSlots: ['', Validators.required],
              oversizeLength: ['', Validators.required],
              oversizeWidth: ['', Validators.required],
              security: ['', Validators.required],
              cctv: ['', Validators.required],
              barriers: ['', Validators.required],
              lighting: ['', Validators.required],
            });

          }, () => {
            console.error(`Could not find node ${this.nodeId}`);
          }
        );
      }
    );
  }

  get restpointType() {
    return this.formGroup.get('restpointType');
  }

  get roadNumber() {
    return this.formGroup.get('roadNumber');
  }

  get milestone() {
    return this.formGroup.get('milestone');
  }

  get generalSlots() {
    return this.formGroup.get('generalSlots');
  }

  get occupancy() {
    return this.formGroup.get('occupancy');
  }

  get slotLength() {
    return this.formGroup.get('slotLength');
  }

  get slotWidth() {
    return this.formGroup.get('slotWidth');
  }

  get hazardousSlots() {
    return this.formGroup.get('hazardousSlots');
  }

  get oversizeLength() {
    return this.formGroup.get('oversizeLength');
  }

  get oversizeWidth() {
    return this.formGroup.get('oversizeWidth');
  }

  get security() {
    return this.formGroup.get('security');
  }

  get cctv() {
    return this.formGroup.get('cctv');
  }

  get barriers() {
    return this.formGroup.get('barriers');
  }

  get lighting() {
    return this.formGroup.get('lighting');
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  createRestpoint(formDirective: FormGroupDirective) {
    this.processing = true;
    const request = new RestpointRequest(
      this.nodeId,
      String(this.restpointType.value),
      String(this.roadNumber.value),
      Number(this.milestone.value),
      Number(this.generalSlots.value),
      Number(this.occupancy.value),
      Number(this.slotLength.value),
      Number(this.slotWidth.value),
      Number(this.hazardousSlots.value),
      Number(this.oversizeLength.value),
      Number(this.oversizeWidth.value),
      this.security.value === "true",
      this.cctv.value === "true",
      this.barriers.value === "true",
      this.lighting.value === "true"
    );

    this.restpointService.postRestpoint(request).subscribe(
      response => {
        this.processing = false;
        this.snackBar.open(`Added new restpoint for node ${this.node.name}`, 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigateByUrl(`/restpoints`);
      }, () => {
        this.processing = false;
      }
    );
  }
}
