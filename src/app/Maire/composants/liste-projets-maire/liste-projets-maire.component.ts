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
  private platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID to detect the platform

  tableProjet: projetModel[] = [];
  statutSelectionne: boolean | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only fetch projects if running in a browser
      this.fetchProjets();
    }
  }

  fetchProjets(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.error('localStorage is not available outside of the browser.');
      return;
    }

    const token = localStorage.getItem('token');

    if (token) {
      if (this.statutSelectionne !== null) {
        this.projectService.getProjetBySatut(this.statutSelectionne).subscribe(
          (response: any) => {
            this.tableProjet = response.data;
          },
          (error: any) => {
            console.error('Error fetching projects by status:', error);
          }
        );
      } else {
        this.projectService.getAllProjets().subscribe(
          (response: any) => {
            this.tableProjet = response.data;
          },
          (error: any) => {
            console.error('Error fetching all projects:', error);
          }
        );
      }
    } else {
      console.warn('No token found in localStorage.');
    }
  }

  editProject(id: number | undefined): void {
    // Implement project editing logic here
  }

  viewProjectDetails(id: number | undefined): void {
    // Implement view project details logic here
  }
}
