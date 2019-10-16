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

@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.css']
})
export class RoadsComponent implements OnInit {

  formGroup: FormGroup;
  processing = false;
  selectedAdmins = new FormControl();
  loading = true;
  roads: Road[] = [];
  nodes: Node[] = [];
  admins: Admin[] = [];
  filteredStartNodes: Observable<Node[]>;
  filteredEndNodes: Observable<Node[]>;
  isSearching = false;

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
    });
    this.getRoads();
    this.getNodes();
    this.getAdmins();

    this.filteredStartNodes = this.formGroup.get('start').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredEndNodes = this.formGroup.get('end').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  getRoads() {
    return this.roadService.getRoads().subscribe(roads => {
      this.roads = roads;
      this.loading = false;
    });
  }

  getNodes() {
    return this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
    });
  }

  getAdmins() {
    return this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  addRoad(formDirective: FormGroupDirective) {
    if (this.isFormValid()) {
      this.processing = true;

      const startId = this._filter(this.start.value)[0].id;
      const endId = this._filter(this.end.value)[0].id;

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
        this.selectedAdmins.value.map(n => Number(n))
      );

      console.log(roadRequest);
      console.log(this.selectedAdmins.value);
      formDirective.resetForm();
      this.roadService.postRoad(roadRequest).subscribe(road => {
        this.roads.unshift(road);
        this.formGroup.reset();
        formDirective.resetForm();
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

  reload(removedId: number) {
    this.getRoads();
  }
}
