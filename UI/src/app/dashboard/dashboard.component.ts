import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [ RouterOutlet,MaterialModule,PageHeaderComponent,SideNavComponent,MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = 'tracker';
  menuClicked: boolean = true;
  toggleMenu() {
    this.menuClicked = !this.menuClicked;
  }
}
