// import { Component, inject } from '@angular/core';
// import { ProjetService } from '../../Maire/projet.service';
// import { projetModel } from '../../Maire/projet.model';
// import { CommonModule } from '@angular/common';
// import { CommentaireService } from '../commentaire.service';
// import { commentaireModel } from '../commentaire.modul';

// @Component({
//   selector: 'app-liste-projet',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './liste-projet.component.html',
//   styleUrl: './liste-projet.component.css'
// })
// export class ListeProjetComponent {

//   private projetService =inject(ProjetService);
//   private commentaireService = inject(CommentaireService);
//     private localStorage = window.localStorage;
  
//     tabprojet: projetModel[] = [];
//     tabcommenatire:commentaireModel[] = [];
  
//     ngOnInit(): void {
//       this.fetchProjetsPublies();
//     }
  
//     fetchProjetsPublies(): void {
//       const token = this.localStorage.getItem('token');
  
//       if (token) {
//         this.projetService.getProjetBySatut(true).subscribe(
//           (response: any) => {
//             this.tabprojet = response.data;
//           },
//           (error: any) => {
//             console.log(error);
//           }
//         );
//       }
//     }
// // recuperation des commentaire




// }



import { Component, inject, OnInit } from '@angular/core';
import { projetModel } from '../../Maire/projet.model';
import { CommonModule } from '@angular/common';
import { CommentaireService } from '../commentaire.service';
import { commentaireModel } from '../commentaire.modul';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProjetService } from '../../projet.service';
import { ProjetService } from '../../projet.service'

@Component({
  selector: 'app-liste-projet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {

  private projetService = inject(ProjetService)
  private commentaireService = inject(CommentaireService);
  private localStorage = window.localStorage;

  tabprojet: projetModel[] = [];
  tabcommenatire: commentaireModel[] = [];
  commentaire:commentaireModel={}

  

  ngOnInit(): void {
    this.fetchProjetsPublies();
    this.getCommentaires();
  }

  fetchProjetsPublies(): void {
    const token = this.localStorage.getItem('token');

    if (token) {
      this.projetService.getProjetBySttut(true).subscribe(
        (response: any) => {
          this.tabprojet = response.data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  // Récupération des commentaires
  getCommentaires(): void {
    this.commentaireService.getCommentaires().subscribe(
      (response:any)=>{
        this.tabcommenatire = response.data
      }, 
      (error: any) => {
        console.log(error);
      }
    )
  }

  // Ajout d'un commentaire
  ajoutCommentaire() {
    if (this.isValidCommentaire()) {
      this.commentaireService.addCommentaire(this.commentaire).subscribe(
        (response: any) => {
          console.log('Réponse du serveur:', response);
          if (response && response.id) {
            this.commentaire = { projet_id: 0, contenu: '' }; // Réinitialiser après soumission
          } else {
            console.error('Réponse du serveur ne contient pas `id`');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la création du commentaire', error);
        }
      );
    } else {
      console.log('Tous les champs obligatoires ne sont pas remplis');
    }
  }

  private isValidCommentaire(): boolean {
    return !!(
      this.commentaire.projet_id &&
      this.commentaire.contenu
    );
  }
}
