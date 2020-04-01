import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Admin} from '../models/admin-model';
import {AdminRequest} from '../models/admin-request';
import {AppConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJweXRvbiIsImlhdCI6MTU4NTU3MzI4MiwiZXhwIjoxNTg1NjU5NjgyfQ.y9dof0zbgcdy_ZH-0QBNfvZ8BvxiNyysfKS-v0ADgdFd-vJPDS8L0sT4hZtdS6ncKmnz6CdKb5cxDl6XE97N3g'})
  };

  constructor(private http: HttpClient) {
  }

  public getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${AppConfig.API_ENDPOINT}/admins`, this.httpOptions);
  }

  public addAdmin(adminRequest: AdminRequest): Observable<Admin> {
    return this.http.post<Admin>(`${AppConfig.API_ENDPOINT}/admins`, adminRequest);
  }

  public deleteAdmin(adminId: number): Observable<{}> {
    return this.http.delete(`${AppConfig.API_ENDPOINT}/admins/${adminId}`);
  }
}
