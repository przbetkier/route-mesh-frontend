import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Road} from '../../models/road-model';
import {Node} from '../../models/node-model';
import {RoadsService} from '../../services/roads.service';
import {NodeService} from '../../services/node.service';
import {RoadRequest} from '../../models/road-request';
import {Admin} from '../../models/admin-model';
import {AdminService} from '../../services/admin.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.css']
})
export class RoadsComponent implements OnInit {

  formGroup: FormGroup;
  searchFormGroup: FormGroup;
  processing = false;
  selectedAdmins = new FormControl();
  loading = true;
  roads: Road[] = [];
  filteredRoads: Observable<Road[]>;
  nodes: Node[] = [];
  admins: Admin[] = [];
  filteredStartNodes: Observable<Node[]>;
  filteredEndNodes: Observable<Node[]>;

  page = 0;
  pageSize = 20;
  length = 0;
  pageSizeOptions: number[] = [20, 50, 100];

  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder,
              private roadService: RoadsService,
              private nodeService: NodeService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      direction: ['', Validators.required],
      type: ['', Validators.required],
      numbers: ['', Validators.required],
      lines: ['', Validators.required],
      maxAxleLoad: ['', Validators.required],
      kmStart: ['', Validators.required],
      kmEnd: ['', Validators.required],
      width: ['', Validators.required]
    });

    this.searchFormGroup = this.formBuilder.group({
      searchInput: ['', {}]
    });
    this.getRoads();
    this.getNodes();
    this.getAdmins();
  }

  get name() {
    return this.formGroup.get('name');
  }

  get start() {
    return this.formGroup.get('start');
  }

  get end() {
    return this.formGroup.get('end');
  }

  get direction() {
    return this.formGroup.get('direction');
  }

  get type() {
    return this.formGroup.get('type');
  }

  get numbers() {
    return this.formGroup.get('numbers');
  }

  get lines() {
    return this.formGroup.get('lines');
  }

  get maxAxleLoad() {
    return this.formGroup.get('maxAxleLoad');
  }

  get kmStart() {
    return this.formGroup.get('kmStart');
  }

  get kmEnd() {
    return this.formGroup.get('kmEnd');
  }

  get width() {
    return this.formGroup.get('width');
  }

  getRoads() {
    return this.roadService.getRoads(this.page, this.pageSize).subscribe(roadsPage => {
      this.roads = roadsPage.content;
      this.page = roadsPage.pageable.pageNumber;
      this.length = roadsPage.totalElements;
      this.loading = false;
      this.filteredRoads = this.filteredRoadsObs();
    });
  }

  getRoadsPage(e?: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getRoads();
  }

  getNodes() {
    return this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.filteredStartNodes = this.filteredStartNodesObs();
      this.filteredEndNodes = this.filteredEndNodesObs();
    });
  }

  getAdmins() {
    return this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;
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

  filteredRoadsObs(): Observable<Road[]> {
    return this.searchFormGroup.get('searchInput').valueChanges.pipe(
      startWith(''),
      map(value => this._filterSearch(value)));
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  addRoad(formDirective: FormGroupDirective) {
    if (this.isFormValid()) {
      this.processing = true;

      const startId = this.nodes.filter(n => n.name === this.start.value)[0].id;
      const endId = this.nodes.filter(n => n.name === this.end.value)[0].id;

      const roadRequest = new RoadRequest(
        this.name.value,
        startId,
        endId,
        this.direction.value,
        this.type.value,
        this.numbers.value.replace(/\s/g, '').split(','),
        [Number(this.kmStart.value), Number(this.kmEnd.value)],
        this.lines.value,
        this.maxAxleLoad.value,
        this.selectedAdmins.value.map(n => Number(n)),
        Number(this.width.value)
      );

      this.roadService.postRoad(roadRequest).subscribe(road => {
        this.roads.unshift(road);
        this.formGroup.reset();
        this.searchFormGroup.reset();
        formDirective.resetForm();
        this.filteredStartNodes = this.filteredStartNodesObs();
        this.filteredEndNodes = this.filteredEndNodesObs();
        this.filteredRoads = this.filteredRoadsObs();
        this.processing = false;
      }, error => {
        this.processing = false;
        console.log(error);
      });
    }
  }

  private _filter(value: string): Node[] {
    const filterValue = value.toLowerCase();
    return this.nodes.filter(node => node.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  private _filterSearch(value: string): Road[] {
    const filterValue = value.toLowerCase();
    return this.roads.filter(road => road.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  reload(removedId: number) {
    this.getRoads();
  }
}
