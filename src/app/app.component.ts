import {Component} from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'route-mesh-frontend';

  constructor(private tokenStorage: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.isLogged();
  }

  logout() {
    this.tokenStorage.signOut();
    this.snackBar.open(`You've been logged out successfully`, 'OK', {duration: 1500, panelClass: ['green-snackbar']});
    this.router.navigateByUrl('/login');
  }

  getUser(): string {
    return this.tokenStorage.getUser().username;
  }
}
