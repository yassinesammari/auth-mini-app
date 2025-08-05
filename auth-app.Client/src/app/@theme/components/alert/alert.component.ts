import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  message: string = '';
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  isVisible: boolean = false;

  showAlert(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ): void {
    this.message = message;
    this.alertType = type;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
  closeAlert(): void {
    this.isVisible = false;
  }
}
