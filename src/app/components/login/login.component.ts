import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Credentials, LoginService} from '../../services/login.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  processing = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private tokenStorage: TokenStorageService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  login() {
    const credentials = new Credentials(this.username.value, this.password.value);
    this.loginService.login(credentials).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.snackBar.open(
          'Logged successfuly',
          'OK', {duration: 2000}
        );
      }
    );
  }

}
