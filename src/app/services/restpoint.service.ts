import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestPointRequest} from '../components/roads/single-road/restpoint/new-restpoint-dialog/new-restpoint-dialog.component';
import {Observable} from 'rxjs';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RestpointService {

  constructor(private http: HttpClient) {
  }

  addRestPoint(restPointRequest: RestPointRequest): Observable<any> {
    return this.http.post<any>(`${AppConfig.API_ENDPOINT}/restpoints`, restPointRequest);
  }
}
