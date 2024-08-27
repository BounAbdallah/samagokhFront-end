import { Component, inject } from '@angular/core';
import { UserService } from '../../../User/user.service';
import { projetModel } from '../../projet.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ProjetService2 } from '../../projet2.service';

@Component({
  selector: 'app-creer-projet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creer-projet.component.html',
  styleUrls: ['./creer-projet.component.css']
})
export class CreerProjetComponent {
  private projetService = inject(ProjetService2);
  private userService = inject(UserService);

  project: projetModel = {};
  isCollapsed = false;

  ajoutProject() {
    if (this.isValidProject()) {
      const projectData: projetModel = {
        titre: this.project.titre,
        commune_id: this.project.commune_id,
        description: this.project.description,
        objectif: this.project.objectif,
        attente: this.project.attente,
        cible: this.project.cible,
        categorie: this.project.categorie,
        statut: this.project.statut,
        etat: this.project.etat,
        budget: this.project.budget,
        image: this.project.image || undefined, // Change null to undefined
        user_id: this.project.user_id ?? undefined // Ensuring user_id is number or undefined, not null
      };

      this.projetService.createProjet(projectData).subscribe(
        (response: any) => {
          console.log('Réponse du serveur:', response);
          if (response && response.id) {
            this.project = {}; // Réinitialiser les champs après la soumission
          } else {
            console.error('Réponse du serveur ne contient pas `id`');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la création du projet', error);
        }
      );
    } else {
      console.log('Tous les champs obligatoires ne sont pas remplis');
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
    console.log(this.project);
  }
}
