import { Component, OnInit } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

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
    console.log('alo', this.loginForm);
    // this.loginForm.controls.password.errors = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = true;
      // return;
    } else if (this.loginForm.controls.password.value) {
      let text = this.loginForm.controls.password.value;
      for (let item of text) {
        if (item == item.toUpperCase()) {
          this.viethoa = true;
          return
        }
        else {
          console.log('ghádsas1');
          this.router.navigateByUrl('/');
        }
      }
    } 

    this.loading = true;
    // perform the login logic here
  }
}
