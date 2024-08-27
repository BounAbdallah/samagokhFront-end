import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { projetModel } from '../../projet.model';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../projet.service';

@Component({
  selector: 'app-liste-projets-maire',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
    // Vérification de l'environnement pour s'assurer que le code est exécuté dans un navigateur
    if (this.isBrowser) {
      const token = localStorage.getItem('token');

      if (token) {
        // Appel du service pour récupérer tous les projets
        this.projectService.getAllProjets().subscribe(
          (response: any) => {
            console.log('Réponse complète de l\'API getAllProjets:', response);
            if (response && Array.isArray(response)) {
              this.tableProjet = response;
            } else {
              console.error('La réponse des projets n\'est pas un tableau:', response);
              this.tableProjet = [];
            }
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des projets:', error);
            this.tableProjet = [];
          }
        );
      } else {
        console.error('Token non trouvé dans localStorage');
      }
    }
  }
}
