import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../projet.service';
import { UserService } from '../../../User/user.service';
import { projetModel } from '../../projet.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creer-projet',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './creer-projet.component.html',
  styleUrls: ['./creer-projet.component.css']
})
export class CreerProjetComponent implements OnInit {
  private projetService = inject(ProjetService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  project: projetModel = {
    statut: false, // Initialisé à false pour éviter undefined
    etat: false    // Initialisé à false pour éviter undefined
  };
  isEditMode = false; // Indique si nous sommes en mode édition
  projectId: number | null = null;
  isCollapsed = false; // Ajouté pour résoudre le problème de 'isCollapsed'

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: number) {
    this.projetService.getProjetDetails(id).subscribe(
      (project) => {
        this.project = project;
      },
      (error) => {
        console.error('Erreur lors du chargement du projet', error);
      }
    );
  }

  saveProject() {
    if (this.isValidProject()) {
      if (this.isEditMode) {
        this.updateProject();
      } else {
        this.createProject();
      }
    } else {
      console.log('Tous les champs obligatoires ne sont pas remplis');
    }
  }

  createProject() {
    this.projetService.createProjet(this.project).subscribe(
      (response: any) => {
        console.log('Projet créé avec succès', response);
        this.project = { statut: false, etat: false }; // Réinitialiser les champs après la soumission
      },
      (error: any) => {
        console.error('Erreur lors de la création du projet', error);
      }
    );
  }

  updateProject() {
    if (this.projectId !== null) {
      this.projetService.updateProjetStatut(this.projectId, this.project.statut!).subscribe(
        (response: any) => {
          console.log('Projet mis à jour avec succès', response);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du projet', error);
        }
      );
    }
  }

  private isValidProject(): boolean {
    return !!(
      this.project.titre &&
      this.project.commune_id &&
      this.project.description &&
      this.project.objectif &&
      this.project.attente &&
      this.project.cible &&
      this.project.categorie &&
      this.project.budget
    );
  }

  logout(): void {
    this.userService.logout();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    this.saveProject();
  }
}