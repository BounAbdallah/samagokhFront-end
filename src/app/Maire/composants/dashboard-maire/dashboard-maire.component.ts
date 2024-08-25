import { Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { BanniereComponent } from "../banniere/banniere.component";
import { NotificationComponent } from "../notification/notification.component";
import { DerniersProjetsComponent } from "../derniers-projets/derniers-projets.component";
import { StatistiqueComponent } from '../statistique/statistique.component';

@Component({
  selector: 'app-dashboard-maire',
  standalone: true,
  imports: [SideBarComponent, BanniereComponent, NotificationComponent, DerniersProjetsComponent,StatistiqueComponent],
  templateUrl: './dashboard-maire.component.html',
  styleUrl: './dashboard-maire.component.css'
})
export class DashboardMaireComponent {

}
