import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ProjetService } from '../projet.service';
import { projetModel } from '../projet.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-projet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.css']
})
export class CardProjetComponent {
  private projectService = inject(ProjetService);
  private platformId = inject(PLATFORM_ID);

  tableProjet: projetModel[] = [];
  displayedProjets: projetModel[] = [];
  isBrowser: boolean;
  pageSize: number = 4; // Nombre de projets par page
  currentPage: number = 1; // Page actuelle

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
          (response: projetModel[]) => {
            console.log("Réponse complète de l'API getAllProjets:", response);
            if (Array.isArray(response)) {
              this.tableProjet = response;
              this.updateDisplayedProjets();
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

  getCategoryIcon(categorie: string): string {
    const icons: { [key: string]: string } = {
      'Sport': '../../../../assets/images/icons/sports_and_outdoors.svg',
      'Education': '../../../../assets/images/icons/education.svg',
      // Ajoutez d'autres catégories et leurs icônes ici
    };

    return icons[categorie] || '../../../../assets/images/icons/default.svg';
  }

  updateDisplayedProjets(): void {
    // Calculez l'index de début et de fin pour les projets affichés
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProjets = this.tableProjet.slice(startIndex, endIndex);
  }

  // Méthodes pour naviguer entre les pages
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.tableProjet.length) {
      this.currentPage++;
      this.updateDisplayedProjets();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProjets();
    }
  }
}
