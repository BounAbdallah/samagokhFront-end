import { Component, inject, OnInit } from '@angular/core';
import { ProjetService } from '../../../projet.service';

@Component({
  selector: 'app-dashbaord-habitant',
  standalone: true,
  imports: [], // Ajoutez des imports Angular spécifiques si nécessaires
  templateUrl: './dashbaord-habitant.component.html',
  styleUrls: ['./dashbaord-habitant.component.css']  // Correction ici
})
export class DashbaordHabitantComponent implements OnInit {
  // ngOnInit(): void {
      
  // }

  

  private projetService = inject(ProjetService);
  totalProjets: number = 0;
  projetsPublies: number = 0;

  ngOnInit(): void {
    this.loadProjectStats();
  }

  loadProjectStats(): void {
    this.projetService.getTotalProjets().subscribe(
      (response: any) => {
        console.log(response);
        
        this.totalProjets = response.count;  // Ajustez selon la structure de la réponse
      },
      error => {
        console.error('Erreur lors de la récupération du nombre total de projets', error);
      }
    );

    this.projetService.getProjetsPublies().subscribe(
      (response: any) => {
        this.projetsPublies = response.count;  // Ajustez selon la structure de la réponse
      },
      error => {
        console.error('Erreur lors de la récupération du nombre de projets publiés', error);
      }
    );
  }
}
