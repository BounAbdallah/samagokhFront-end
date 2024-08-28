import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './base-dashboard.component.html',
  styleUrl: './base-dashboard.component.css'
})
export class BaseDashboardComponent {

}
