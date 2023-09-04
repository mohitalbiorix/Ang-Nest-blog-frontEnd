import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toasterService: ToastrService) {}

  // Success message notification
  success(message: string): void {
    this.toasterService.success(message, 'Success');
  }

  // Info message notification
  info(message: string): void {
    this.toasterService.info(message, 'Info');
  }

  // Warning message notification
  warning(message: string): void {
    this.toasterService.warning(message, 'Warning');
  }

  // Error message notification
  error(message: string): void {
    this.toasterService.error(message, 'Error');
  }
}
