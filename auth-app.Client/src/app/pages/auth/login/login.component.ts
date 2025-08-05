import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../@theme/components/alert/alert.component';
import { AuthService } from '../../../data/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  authForm!: FormGroup;
  authRequest = {
    email: null,
    password: null,
  };
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.login();
  }

  login(): void {
    this.authRequest.email = this.authForm.get('email')?.value;
    this.authRequest.password = this.authForm.get('password')?.value;
    if (!this.authRequest.email || !this.authRequest.password) {
      this.alert.showAlert('Please enter both email and password.', 'error');
      return;
    }
    this.authService.login(this.authRequest).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.alert.showAlert('Login successful!', 'success');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        } else{
          this.alert.showAlert('Invalid email or password.', 'error');
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.alert.showAlert('Invalid email or password.', 'error');
        } else if (error.status === 500) {
          this.alert.showAlert('An unexpected error occurred. Please try again later.', 'error');
        } else {
          this.alert.showAlert('Login failed. Please check your connection.', 'error');
        }
      },
    });
  }
}
