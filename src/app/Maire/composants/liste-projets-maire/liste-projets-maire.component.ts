import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../projet.model';

@Component({
  selector: 'app-liste-projets-maire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-projets-maire.component.html',
  styleUrls: ['./liste-projets-maire.component.css']
})
export class ListeProjetsMaireComponent implements OnInit {
  private projectService = inject(ProjetService);
  private platformId = inject(PLATFORM_ID);

  tableProjet: projetModel[] = [];

  isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.fetchProjets();
  }

  fetchProjets(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');

      if (token) {
        this.projectService.getAllProjets().subscribe(
          (response: any) => {
            console.log('Réponse de l\'API getAllProjets:', response);
            this.tableProjet = response.data || []; // Assurez-vous que 'data' est toujours un tableau
            console.log('tableProjet après assignation:', this.tableProjet);
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des projets:', error);
            this.tableProjet = []; // Initialisez comme un tableau vide en cas d'erreur
          }
        );
      } else {
        console.error('Token non trouvé dans localStorage');
      }
    }
  }

  editProject(id: number | undefined): void {
    // Implémentez la logique d'édition du projet ici
  }

  viewProjectDetails(id: number | undefined): void {
    // Implémentez la logique de visualisation des détails du projet ici
  }
}
