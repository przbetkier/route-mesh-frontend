import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../config/config';
import {RoundaboutRequest} from '../models/roundabout-request';
import {RoundaboutResponse} from '../models/roundabout-response';

@Injectable({
  providedIn: 'root'
})
export class RoundaboutService {

  constructor(private http: HttpClient) {
  }

  public postRoundabout(roundaboutRequest: RoundaboutRequest): Observable<any> {
    return this.http.post<any>(`${AppConfig.API_ENDPOINT}/roundabouts`, roundaboutRequest);
  }

  public getRoundabouts(): Observable<RoundaboutResponse[]> {
    return this.http.get<RoundaboutResponse[]>(`${AppConfig.API_ENDPOINT}/roundabouts`);
  }

  public deleteRoundabout(id: number): Observable<any> {
    return this.http.delete<any>(`${AppConfig.API_ENDPOINT}/roundabouts/${id}`);
  }
}
