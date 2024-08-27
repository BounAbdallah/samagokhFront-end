import { Component } from '@angular/core';

import { ListeHabitantsComponent } from "../liste-habitants/liste-habitants.component";
import { SideBarComponent } from '../../side-bar/side-bar.component';


@Component({
  selector: 'app-page-liste-habitants',
  standalone: true,
  imports: [ListeHabitantsComponent,SideBarComponent ],
  templateUrl: './page-liste-habitants.component.html',
  styleUrl: './page-liste-habitants.component.css'
})
export class PageListeHabitantsComponent {

}
