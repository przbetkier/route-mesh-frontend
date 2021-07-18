import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Routes} from '../models/route-model';
import {RouteRequest} from '../models/route-request';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {
  }

  public getRoutes(routeRequest: RouteRequest): Observable<Routes> {
    return this.http.post<Routes>(`${AppConfig.ROUTE_ENDPOINT}/`, routeRequest);
  }
}
