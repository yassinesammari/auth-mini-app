import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AuthService } from '../../../data/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.removeToken();
    this.alert.showAlert('Logout successful!', 'success');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
