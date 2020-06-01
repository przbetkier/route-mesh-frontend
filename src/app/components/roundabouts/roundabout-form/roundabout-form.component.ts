import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Node} from '../../../models/node-model';
import {NodeService} from '../../../services/node.service';
import {SimpleRoad} from '../../../models/simple-road';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ExitRequest, RoundaboutRequest} from '../../../models/roundabout-request';
import {RoundaboutService} from '../../../services/roundabout.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-roundabout-form',
  templateUrl: './roundabout-form.component.html',
  styleUrls: ['./roundabout-form.component.css']
})
export class RoundaboutFormComponent implements OnInit {

  isLoading: boolean;
  nodeId: number;
  node: Node;
  roads: SimpleRoad[];
  formGroup: FormGroup;
  processing = false;

  constructor(private route: ActivatedRoute, private nodeService: NodeService,
              private formBuilder: FormBuilder, private roundaboutService: RoundaboutService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.nodeId = Number(params.get('nodeId'));

        this.nodeService.getNode(this.nodeId).subscribe(
          data => {
            this.node = data;
            this.roads = this.node.startRoads.concat(this.node.endRoads);
            this.isLoading = false;

            this.formGroup = this.formBuilder.group({
              innerDiameter: ['', Validators.required],
              outerDiameter: ['', Validators.required],
              exits: this.formBuilder.array(this.roads.map(elem => this.createExit(elem)))
            });

          }, () => {
            console.error(`Could not find node ${this.nodeId}`);
          }
        );
      }
    );
  }

  createExit(road: SimpleRoad): FormGroup {
    return this.formBuilder.group({
      ...road,
      name: [road.name],
      startAngle: ['', Validators.required],
      endAngle: ['', Validators.required]
    });
  }

  get exits() {
    return this.formGroup.get('exits');
  }

  get innerDiameter() {
    return this.formGroup.get('innerDiameter');
  }

  get outerDiameter() {
    return this.formGroup.get('outerDiameter');
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  createRoundabout(formDirective: FormGroupDirective) {
    this.processing = true;
    const request = new RoundaboutRequest(
      this.nodeId,
      Number(this.innerDiameter.value),
      Number(this.outerDiameter.value),
      this.exits.value.map(e =>
        new ExitRequest(e.id, e.startAngle, e.endAngle)
      )
    );

    this.roundaboutService.postRoundabout(request).subscribe(
      response => {
        this.processing = false;
        this.snackBar.open(`Added new roundabout for node ${this.node.name}`, 'OK', {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigateByUrl(`/roundabouts`);
      }, () => {
        this.processing = false;
      }
    );
  }

}
