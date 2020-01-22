import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../services';

@Component({ templateUrl: 'change-password.component.html' })
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
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
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.changePasswordForm.setValidators(this.compareNewPasswordsValidator());
  }

  private compareNewPasswordsValidator(): ValidatorFn {
    return (controls: FormGroup): ValidationErrors | null =>{
      const newPassword = controls.get('newPassword');
      const password = controls.get('password');
      if (newPassword.value !== password.value) {
        password.setErrors({notEqual: true});
        newPassword.setErrors({notEqual: true});
        return {notEqual: true};
      } else {
        if (this.f['newPassword'].errors?.notEqual) newPassword.setErrors(null);
        if (this.f['password'].errors?.notEqual) password.setErrors(null);
        return null;
      }
    }
  };

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.changePassword(this.f.oldPassword.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.changePasswordForm.reset();
          this.changePasswordForm.clearValidators();
          Object.keys(this.changePasswordForm.controls).forEach(key => {
            this.changePasswordForm.get(key).setErrors(null) ;
          });
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        });
  }
}