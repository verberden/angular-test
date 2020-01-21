import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../services';

@Component({ templateUrl: 'create-user.component.html' })
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {  }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.create(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.createUserForm.reset();
          this.createUserForm.clearValidators();
          Object.keys(this.createUserForm.controls).forEach(key => {
            this.createUserForm.get(key).setErrors(null) ;
          });
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        });
  }
}