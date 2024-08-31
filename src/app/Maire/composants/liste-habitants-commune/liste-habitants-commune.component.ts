import { Component, inject } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { UserModel } from '../../../User/user.model';
import { UserService } from '../../../User/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-habitants-commune',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './liste-habitants-commune.component.html',
  styleUrl: './liste-habitants-commune.component.css'
})
export class ListeHabitantsCommuneComponent {

  private userService = inject(UserService);

  tabhabitant: UserModel[] = [];



  ngOnInit(): void {
    this.loadproject()
      
  }

  loadproject() {
    this.userService.getAllhabitant().subscribe(
      (response: any) => {
        this. tabhabitant = response.data;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des communes', error);
      }
    );
  }}




