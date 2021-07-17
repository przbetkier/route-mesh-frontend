import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../config/config';
import {RestpointRequest} from '../models/restpoint-request';
import {RestpointResponse} from '../models/restpoint-response';

@Injectable({
  providedIn: 'root'
})
export class RestpointService {

  constructor(private http: HttpClient) {
  }

  public postRestpoint(restpointRequest: RestpointRequest): Observable<any> {
    return this.http.post<any>(`${AppConfig.API_ENDPOINT}/restpoints`, restpointRequest);
  }

  public getRestpoints(): Observable<RestpointResponse[]> {
    return this.http.get<RestpointResponse[]>(`${AppConfig.API_ENDPOINT}/restpoints`);
  }

  public deleteRestpoint(id: number): Observable<any> {
    return this.http.delete<any>(`${AppConfig.API_ENDPOINT}/restpoints/${id}`);
  }
}
