import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfig} from '../config/config';
import {HttpClient} from '@angular/common/http';
import {HeightObstacleRequest} from '../models/height-obstacle-request';

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {

  constructor(private http: HttpClient) {
  }

  public addHeightObstacle(heightObstacleRequest: HeightObstacleRequest): Observable<Obstacle> {
    return this.http.post<Obstacle>(`${AppConfig.API_ENDPOINT}/height-obstacles`, heightObstacleRequest);
  }

  public deleteObstacle(id: number): Observable<Obstacle> {
    return this.http.delete<Obstacle>(`${AppConfig.API_ENDPOINT}/obstacles/${id}`);
  }
}

interface Obstacle {
  id: number;
  name: string;
}
