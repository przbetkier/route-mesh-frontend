import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../services/node.service';
import {Node} from '../../models/node-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  nodes: Node[] = [];
  loading = true;

  filteredNodes: Node[] = [];

  constructor(private nodeService: NodeService, private router: Router) {
  }

  ngOnInit() {
    this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.filteredNodes = nodes;
      this.loading = false;
    });
  }

  createRoundabout(nodeId: number) {
    this.router.navigateByUrl(`/roundabout-form/${nodeId}`);
  }

  changeType(type: string) {
    this.loading = true;
    if (type === 'ALL') {
      this.filteredNodes = this.nodes;
    } else {
      this.filteredNodes = this.nodes.filter(n => n.type === type);
    }
    this.loading = false;
  }
}
