import { Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { BanniereComponent } from "../banniere/banniere.component";
import { NotificationComponent } from "../notification/notification.component";
import { DerniersProjetsComponent } from "../derniers-projets/derniers-projets.component";
import { ListeProjetsMaireComponent } from "../liste-projets-maire/liste-projets-maire.component";
import { CardProjetComponent } from '../../card-projet/card-projet.component';
import { StatistiqueComponent } from "../statistique/statistique.component";
import { CardProjetMairieComponent } from "../card-projet-mairie/card-projet-mairie.component";

@Component({
  selector: 'app-dashboard-maire',
  standalone: true,
  imports: [SideBarComponent, BanniereComponent, NotificationComponent, DerniersProjetsComponent, ListeProjetsMaireComponent, CardProjetComponent, StatistiqueComponent, CardProjetMairieComponent],
  templateUrl: './dashboard-maire.component.html',
  styleUrl: './dashboard-maire.component.css'
})
export class DashboardMaireComponent {

}
