import { Component, inject } from '@angular/core';
import { AuthHelperService } from 'src/app/core/services/auth-helper.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  private authHelper = inject(AuthHelperService)

  sideNavState!: boolean

  ngOnInit(): void {
    const pos = localStorage.getItem('TM-opened')
    this.sideNavState = pos ? JSON.parse(pos) : ''
  }

  handleToggle(ev: boolean) {
    this.sideNavState = ev
    localStorage.setItem('TM-opened', JSON.stringify(ev))
  }

  logout() {
    this.authHelper.logout()
  }

}
