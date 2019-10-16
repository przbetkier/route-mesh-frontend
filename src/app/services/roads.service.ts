import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Road} from '../models/road-model';
import {RoadRequest} from '../models/road-request';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RoadsService {

  constructor(private http: HttpClient) {
  }

  public getRoads(): Observable<Road[]> {
    return this.http.get<Road[]>(`${AppConfig.API_ENDPOINT}/roads`);
  }

  public postRoad(roadRequest: RoadRequest): Observable<Road> {
    return this.http.post<Road>(`${AppConfig.API_ENDPOINT}/roads`, roadRequest);
  }

  public deleteRoad(roadId: number): Observable<{}> {
    return this.http.delete(`${AppConfig.API_ENDPOINT}/roads/${roadId}`);
  }
}
