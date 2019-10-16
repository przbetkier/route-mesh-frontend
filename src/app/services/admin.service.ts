import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Admin} from '../models/admin-model';
import {AdminRequest} from '../models/admin-request';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  public getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${AppConfig.API_ENDPOINT}/admins`);
  }

  public addAdmin(adminRequest: AdminRequest): Observable<Admin> {
    return this.http.post<Admin>(`${AppConfig.API_ENDPOINT}/admins`, adminRequest);
  }

  public deleteAdmin(adminId: number): Observable<{}> {
    return this.http.delete(`${AppConfig.API_ENDPOINT}/admins/${adminId}`);
  }
}
