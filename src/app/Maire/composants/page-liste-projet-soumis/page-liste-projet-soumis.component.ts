import { Component } from '@angular/core';
import { ListeProjetSoumisComponent } from "../liste-projet-soumis/liste-projet-soumis.component";
import { SideBarComponent } from '../../side-bar/side-bar.component';


@Component({
  selector: 'app-page-liste-projet-soumis',
  standalone: true,
  imports: [ListeProjetSoumisComponent,SideBarComponent ],
  templateUrl: './page-liste-projet-soumis.component.html',
  styleUrl: './page-liste-projet-soumis.component.css'
})
export class PageListeProjetSoumisComponent {

}
