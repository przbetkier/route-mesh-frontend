import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Node} from '../models/node-model';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) {
  }

  public getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(`${AppConfig.API_ENDPOINT}/nodes`);
  }

  public getNode(nodeId: number): Observable<Node> {
    return this.http.get<Node>(`${AppConfig.API_ENDPOINT}/nodes/${nodeId}`);
  }
}
