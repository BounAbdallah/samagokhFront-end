

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { projetModel } from '../../projet.model';
import { UserService } from '../../../User/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetService } from '../../../projet.service';

import { BarDeRecherheComponent } from "../bar-de-recherhe/bar-de-recherhe.component";
import { SideBarComponent } from '../side-bar/side-bar.component';


@Component({
  selector: 'app-liste-projets-habitant',
  standalone: true,
  imports: [CommonModule, SideBarComponent, BarDeRecherheComponent],
  templateUrl: './liste-projets-habitant.component.html',
  styleUrls: ['./liste-projets-habitant.component.css']
})
export class ListeProjetsHabitantComponent implements OnInit {
  

  private projetService = inject(ProjetService);
  private userService = inject(UserService);
  private router = inject(Router);
  private localStorage = window.localStorage;

  tabprojet: projetModel[] = [];
  statutSelectionne: boolean | null = null;
  selectedProjet?: projetModel;  // Ajout d'une propriété pour stocker le projet sélectionné
  showModal: boolean = false;

  ngOnInit(): void {
    this.fetchProjets();
  }

  fetchProjets(): void {
    const token = this.localStorage.getItem('token');

    if (token) {
      if (this.statutSelectionne !== null) {
        this.projetService.getProjetBySttut(this.statutSelectionne).subscribe(
          (response: any) => {
            this.tabprojet = response.data;
          },
          (error: any) => {
            console.log(error);
          }
        );
      } else {
        this.projetService.getAllProjets().subscribe(
          (response: any) => {
            this.tabprojet = response.data;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }

  // fetchProjets(): void {
  //   const token = this.localStorage.getItem('token');
  //   const userId = this.localStorage.getItem('userId'); 
  
  //   if (token) {
  //     if (this.statutSelectionne !== null) {
  //       this.projetService.getProjetBySttut(this.statutSelectionne).subscribe(
  //         (response: any) => {
  //           console.log('API Response:', response.data); // Vérifie le contenu des données
  //           this.tabprojet = response.data.filter((projet: any) => projet.user_id === userId);
  //         },
  //         (error: any) => {
  //           console.log(error);
  //         }
  //       );
  //     } else {
  //       this.projetService.getAllProjets().subscribe(
  //         (response: any) => {
  //           console.log('API Response:', response.data); // Vérifie le contenu des données
  //           this.tabprojet = response.data.filter((projet: any) => projet.user_id === userId);
  //         },
  //         (error: any) => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //   }
  // }
  




  afficherProjetsPublies(): void {
    this.statutSelectionne = true;
    this.fetchProjets();
  }

  afficherProjetsNonPublies(): void {
    this.statutSelectionne = false;
    this.fetchProjets();
  }

  // Méthode pour afficher les détails d'un projet non publié
  openProjectDetail(projet: projetModel): void {

    if (projet.statut === 1) {  // Vérifie que le statut est égal à 1
        this.router.navigate(['/project-detail', projet.id]);  // Navigue vers la page des détails du projet
      }




    else if (typeof projet.id === 'number' && projet.statut === 0) {  // Vérifie que `id` est un nombre et `statut` est 0
      this.projetService.getProjetById(projet.id).subscribe(
        (response: projetModel) => {
          this.selectedProjet = response;
          this.showModal = true;  // Affiche le modal
          console.log(this.selectedProjet);  // Pour vérifier que le projet est bien chargé
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des détails du projet', error);
        }
      );
    } else {
      console.error('Projet ID est indéfini ou le statut n\'est pas 0.');
    }
  }
  

closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation(); // Empêche la propagation du clic dans le modal
    }
    this.showModal = false; // Cache le modal
  }




  // Méthode de déconnexion
  logout(): void {
    this.userService.logout().subscribe(
      () => {
        // Optionnel : Effacer les informations de l'utilisateur
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion ou la page d'accueil
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => { // Spécifiez le type pour 'error'
        console.error('Erreur de déconnexion', error);
      }
    );
  }

  trackByFn(index: any, item: projetModel): any {
    return item.id; // Assurez-vous que chaque projet a un ID unique
  }



//   suppression

deleteProject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProject(id).subscribe(
        () => {
          // Supprimer le projet de la liste locale après la suppression réussie
          this.tabprojet = this.tabprojet.filter(projet => projet.id !== id);
          alert('Projet supprimé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la suppression du projet', error);
          alert('Erreur lors de la suppression du projet.');
        }
      );
    }
  }


//   publier un projet

publishProject(projet: projetModel): void {
    if (projet.statut === 0) {  // Vérifie si le projet est non publié
      this.projetService.publierProjet(projet.id, true).subscribe( // Passer `true` pour publier
        () => {
          // Mise à jour du statut localement après publication réussie
          projet.statut = 1;
          alert('Projet publié avec succès !');
        },
        (error: any) => {
          console.error('Erreur lors de la publication du projet', error);
          alert('Erreur lors de la publication du projet.');
        }
      );
    } else {
      console.log('Le projet est déjà publié.');
    }
  }


}



