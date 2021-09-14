import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Node} from '../../models/node-model';
import {NodeService} from '../../services/node.service';
import {RouteService} from '../../services/route.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PageEvent} from '@angular/material';
import {RouteRequest} from '../../models/route-request';
import {Route} from '../../models/route-model';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  formGroup: FormGroup;
  searchFormGroup: FormGroup;
  processing = false;
  notExist = true;
  selectedAdmins = new FormControl();
  loading = false;
  nodes: Node[] = [];
  routes: Route[];
  filteredStartNodes: Observable<Node[]>;
  filteredEndNodes: Observable<Node[]>;
  query = '';

  page = 0;
  pageSize = 20;
  length = 0;
  pageSizeOptions: number[] = [20, 50, 100];

  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder,
              private routeService: RouteService,
              private nodeService: NodeService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      start: ['Prosienica S8 Kierunek Warszawa', Validators.required],
      end: ['Adamowice S8 Kierunek Wrocław', Validators.required],
      maxCost: [0, Validators.required],
      daysToDepart: [2, Validators.required],
      maxTime: [600, Validators.required],
      startingTime: [255, Validators.required],
      vLength: [18000, Validators.required],
      vHeight: [4080, Validators.required],
      vMlc: [40, Validators.required],
      vWidth: [3000, Validators.required],
      vSpacing: [1270, Validators.required],
      vClerance: [223, Validators.required],
      vLoad: [100, Validators.required],
      vWidthRangeStart: [780, Validators.required],
      vWidthRangeEnd: [4080, Validators.required],
      vWidthTop: [3500, Validators.required],
      vFirstAxle: [12290, Validators.required],
      vLastAxle: [16000, Validators.required],
      vTireWidth: [735, Validators.required],
      vAngle: [60, Validators.required],
      vBolt: [1000, Validators.required],
      vHazardous: ['', Validators.required],
      vValue: ['', Validators.required],
      vDrivers: [1, Validators.required],
      singleDriveTime: [150, Validators.required],
      dailyDriveTime: [300, Validators.required],
      weeklyDriveTime: [500, Validators.required]
    });

    this.searchFormGroup = this.formBuilder.group({
      searchInput: ['', {}]
    });
    this.getNodes();
  }

  get start() {
    return this.formGroup.get('start');
  }

  get end() {
    return this.formGroup.get('end');
  }

  get maxCost() {
    return this.formGroup.get('maxCost');
  }

  get daysToDepart() {
    return this.formGroup.get('daysToDepart');
  }

  get maxTime() {
    return this.formGroup.get('maxTime');
  }

  get startingTime() {
    return this.formGroup.get('startingTime');
  }

  get vLength() {
    return this.formGroup.get('vLength');
  }

  get vHeight() {
    return this.formGroup.get('vHeight');
  }

  get vMlc() {
    return this.formGroup.get('vMlc');
  }

  get vWidth() {
    return this.formGroup.get('vWidth');
  }

  get vSpacing() {
    return this.formGroup.get('vSpacing');
  }

  get vClerance() {
    return this.formGroup.get('vClerance');
  }

  get vLoad() {
    return this.formGroup.get('vLoad');
  }

  get vWidthRangeStart() {
    return this.formGroup.get('vWidthRangeStart');
  }

  get vWidthRangeEnd() {
    return this.formGroup.get('vWidthRangeEnd');
  }

  get vWidthTop() {
    return this.formGroup.get('vWidthTop');
  }

  get vFirstAxle() {
    return this.formGroup.get('vFirstAxle');
  }

  get vLastAxle() {
    return this.formGroup.get('vLastAxle');
  }

  get vTireWidth() {
    return this.formGroup.get('vTireWidth');
  }

  get vAngle() {
    return this.formGroup.get('vAngle');
  }

  get vBolt() {
    return this.formGroup.get('vBolt');
  }

  get vHazardous() {
    return this.formGroup.get('vHazardous');
  }

  get vValue() {
    return this.formGroup.get('vValue');
  }

  get vDrivers() {
    return this.formGroup.get('vDrivers');
  }

  get singleDriveTime() {
    return this.formGroup.get('singleDriveTime');
  }

  get dailyDriveTime() {
    return this.formGroup.get('dailyDriveTime');
  }

  get weeklyDriveTime() {
    return this.formGroup.get('weeklyDriveTime');
  }

  getNodes() {
    return this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.filteredStartNodes = this.filteredStartNodesObs();
      this.filteredEndNodes = this.filteredEndNodesObs();
    });
  }

  filteredStartNodesObs(): Observable<Node[]> {
    return this.formGroup.get('start').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
  }

  filteredEndNodesObs(): Observable<Node[]> {
    return this.formGroup.get('end').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  calculateRoute(formDirective: FormGroupDirective) {
    if (this.isFormValid()) {
      this.processing = true;

      const startId = this.nodes.filter(n => n.name === this.start.value)[0].id;
      const endId = this.nodes.filter(n => n.name === this.end.value)[0].id;

      const routeRequest = new RouteRequest(
        startId,
        endId,
        this.maxCost.value,
        this.daysToDepart.value,
        this.maxTime.value,
        this.startingTime.value,
        this.vLength.value,
        this.vHeight.value,
        this.vMlc.value,
        this.vWidth.value,
        this.vSpacing.value,
        this.vClerance.value,
        this.vLoad.value,
        this.vWidthRangeStart.value,
        this.vWidthRangeEnd.value,
        this.vWidthTop.value,
        this.vFirstAxle.value,
        this.vLastAxle.value,
        this.vTireWidth.value,
        this.vAngle.value,
        this.vBolt.value,
        this.vHazardous.value,
        this.vValue.value,
        this.vDrivers.value,
        this.singleDriveTime.value,
        this.dailyDriveTime.value,
        this.weeklyDriveTime.value
      );

      this.routeService.getRoutes(routeRequest).subscribe(routes => {
        console.log(routeRequest);
        console.log(routes);
        this.routes = routes;
        if (routes[0]) {
          this.notExist = true;
        } else {
          this.notExist = false;
        }
        this.formGroup.reset();
        this.searchFormGroup.reset();
        formDirective.resetForm();
        this.filteredStartNodes = this.filteredStartNodesObs();
        this.filteredEndNodes = this.filteredEndNodesObs();
        this.processing = false;
      }, error => {
        this.processing = false;
        console.log(error);
      });
    }
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  private _filter(value: string): Node[] {
    let filterValue = '';
    if (value !== null && value !== undefined) {
      filterValue = value.toLowerCase();
    }
    return this.nodes.filter(node => node.name.toLowerCase().indexOf(filterValue) >= 0);
  }
}
