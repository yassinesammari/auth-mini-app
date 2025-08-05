import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../@theme/components/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  registerForm!: FormGroup;
  registerRequest = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.registerRequest.email = this.registerForm.get('email')?.value;
    this.registerRequest.password = this.registerForm.get('password')?.value;
    this.registerRequest.firstName = this.registerForm.get('firstName')?.value;
    this.registerRequest.lastName = this.registerForm.get('lastName')?.value;
    this.register(this.registerRequest);
  }
  register(req: any) {
    this.authService.register(req).subscribe({
      next: (response: any) => {
        this.alert.showAlert('Registration successful!', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.alert.showAlert('A user with this email already exists!', 'error');
        } else if (error.status === 500) {
          this.alert.showAlert('An error occurred while creating the user.', 'error');
        } else {
          this.alert.showAlert('Unexpected error during registration.', 'error');
        }
      },
    });
  }
}
