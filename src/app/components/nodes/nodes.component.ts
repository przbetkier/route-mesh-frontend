import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../services/node.service';
import {Node} from '../../models/node-model';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  nodes: Node[] = [];
  loading = true;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.loading = false;
    });
  }

}
