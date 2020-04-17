import {Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {User} from './login.service';
import {AppConfig} from '../config/config';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const DATE = 'ISSUED_AT';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.setItem(DATE, `${Date.now()}`);
  }

  public isLogged(): boolean {
    const token = this.getToken();
    return !isNullOrUndefined(token) && !this.isTokenExpired();
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public getIssuedAtDate(): number {
    return Number(window.localStorage.getItem(DATE));
  }

  private isTokenExpired() {
    const millisecondsSinceLoggedIn = new Date().getTime() - new Date(this.getIssuedAtDate()).getTime();
    return millisecondsSinceLoggedIn > AppConfig.AUTH_TOKEN_EXPIRATION_TIME;
  }
}
