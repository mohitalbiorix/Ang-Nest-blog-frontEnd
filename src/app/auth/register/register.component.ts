import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginUserInfo } from 'src/app/shared/models/login.model';
import { ConfirmedValidator } from 'src/app/shared/validators/confirm-password.validators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  // Registration form formgroup
  userRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  // Initialization of registration form
  initRegistrationForm(): void {
    this.userRegistrationForm = this.fb.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
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
        confirm_password: ['', Validators.required],
      },
      {
        validators: [ConfirmedValidator('password', 'confirm_password')],
      } as AbstractControlOptions
    );
  }

  // save registration form
  async saveRegistrationForm(): Promise<void> {
    const userValue = this.userRegistrationForm.value;
    const user: LoginUserInfo = {
      name: userValue.name,
      username: userValue.username,
      email: userValue.email,
      password: userValue.password,
    };

    if (
      !user.name &&
      !user.username &&
      !user.email &&
      !user.password &&
      !user.confirm_password
    ) {
      this.notificationService.warning('All filed should be required!');
    }
    if (this.userRegistrationForm.invalid) {
      return;
    }
    this.authService.register(user).subscribe({
      next: (res) => {
        if (res?.error) {
          this.notificationService.error(res?.error);
        } else {
          this.notificationService.success('Registration Successfull!');
          this.resetRegistrationForm();
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        this.notificationService.error('Something went wrong!');
        console.error('An error occurred :', err);
      },
      complete: () => console.log('There are no more action happen.'),
    });
  }

  // reset user form
  resetRegistrationForm(): void {
    this.userRegistrationForm.reset();
  }

  // error function that showing error message
  public hasError(controlName: string, errorName: string): boolean {
    return this.userRegistrationForm.controls[controlName].hasError(errorName);
  }
}
