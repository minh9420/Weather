import { Component, OnInit } from '@angular/core';
import { account } from '../mock_account';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
// import { Validator,Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  viethoa = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    var username = this.loginForm.get("email")?.value
    var password = this.loginForm.get("password")?.value
    console.log(account);
    if (username == account.username && account.password) {
      this.authService.saveUser(username, password);
      this.router.navigate(['']);
    } else {

    }
  }
}
