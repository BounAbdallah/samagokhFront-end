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
          (response: any[]) => {  // Modifiez le type ici
            console.log("Réponse complète de l'API getAllProjets:", response);
            if (Array.isArray(response)) {  // Pas besoin de vérifier response.data
              this.tableProjet = response;
            } else {
              console.error("La réponse des projets n'est pas un tableau:", response);
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
