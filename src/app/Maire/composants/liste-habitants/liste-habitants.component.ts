import { Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";

@Component({
  selector: 'app-liste-habitants',
  standalone: true,
  imports: [SideBarComponent, ListeHabitantsComponent],
  templateUrl: './liste-habitants.component.html',
  styleUrl: './liste-habitants.component.css'
})
export class ListeHabitantsComponent {

}
