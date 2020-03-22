import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Road} from '../models/road-model';
import {RoadRequest} from '../models/road-request';
import {AppConfig} from '../config/config';
import {RoadsPage} from '../models/roads-page';

@Injectable({
  providedIn: 'root'
})
export class RoadsService {

  constructor(private http: HttpClient) {
  }

  public getRoad(id: number): Observable<Road> {
    return this.http.get<Road>(`${AppConfig.API_ENDPOINT}/roads/${id}`);
  }

  public getRoads(page: number, pageSize: number): Observable<RoadsPage> {
    return this.http.get<RoadsPage>(`${AppConfig.API_ENDPOINT}/roads?page=${page}&size=${pageSize}`);
  }

  public postRoad(roadRequest: RoadRequest): Observable<Road> {
    return this.http.post<Road>(`${AppConfig.API_ENDPOINT}/roads`, roadRequest);
  }

  public deleteRoad(roadId: number): Observable<{}> {
    return this.http.delete(`${AppConfig.API_ENDPOINT}/roads/${roadId}`);
  }
}
