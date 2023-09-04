import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginUserInfo } from 'src/app/shared/models/login.model';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  // Login formGroup
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  // Initialization of user form.
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
          ),
        ],
      ],
    });
  }

  // reset user form
  resetLoginForm(): void {
    this.loginForm.reset();
  }

  // save login form
  saveLoginForm(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const loginFormValue: LoginUserInfo = this.loginForm.value;
    const userInfo = {
      email: loginFormValue.email,
      password: loginFormValue.password,
    };
    this.authService.login(userInfo).subscribe((res) => {
      if (res) {
        this.notificationService.success('User Login Successfully!');
        this.router.navigate(['/user/user-list'])
        this.resetLoginForm();
      } else {
        this.notificationService.error('Email or Password not valid!');
      }
    });
  }

  // error function that showing error message
  public hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
