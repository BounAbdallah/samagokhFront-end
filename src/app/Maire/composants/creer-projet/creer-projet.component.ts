import { Component, inject } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { UserService } from '../../../User/user.service';
import { projetModel } from '../../projet.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-creer-projet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creer-projet.component.html',
  styleUrls: ['./creer-projet.component.css']
})
export class CreerProjetComponent {



  private projetService = inject(ProjetService);
  private userService = inject(UserService);


  project: projetModel = {};
  isCollapsed = false;

  ajoutProject() {
    if (this.isValidProject()) {
      const projectData = {
        titre: this.project.titre,
        commune_id: this.project.commune_id,
        description: this.project.description,
        objectif: this.project.objectif,
        attente: this.project.attente,
        cible: this.project.cible,
        categorie: this.project.categorie,
        statut: this.project.statut ? 1 : 0,
        etat: this.project.etat ? 1 : 0,
        budget: parseFloat(this.project.budget || '0'),
        image: this.project.image || null,
        user_id: this.project.user_id || null
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
      // this.project.statut !== undefined &&
      // this.project.etat !== undefined &&
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
