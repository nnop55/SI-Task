import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-inner',
  templateUrl: './manager-inner.component.html',
  styleUrls: ['./manager-inner.component.scss']
})
export class ManagerInnerComponent {
  private router = inject(Router)
  handleRegistered() {
    this.router.navigate(['/managers'])
  }
}
