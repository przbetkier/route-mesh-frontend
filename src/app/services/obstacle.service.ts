import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfig} from '../config/config';
import {HttpClient} from '@angular/common/http';
import {ObstacleRequest} from '../models/obstacle-request';
import {Obstacle} from '../models/obstacle';

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Obstacle[]> {
    return this.http.get<Obstacle[]>(`${AppConfig.API_ENDPOINT}/obstacles`);
  }

  public getObstacle(id: number): Observable<Obstacle> {
    return this.http.get<Obstacle>(`${AppConfig.API_ENDPOINT}/obstacles/${id}`);
  }

  public addObstacle(obstacleRequest: ObstacleRequest): Observable<Obstacle> {
    return this.http.post<Obstacle>(`${AppConfig.API_ENDPOINT}/obstacles`, obstacleRequest);
  }

  public deleteObstacle(id: number): Observable<Obstacle> {
    return this.http.delete<Obstacle>(`${AppConfig.API_ENDPOINT}/obstacles/${id}`);
  }
}
