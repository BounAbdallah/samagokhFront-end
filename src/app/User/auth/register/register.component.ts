

// import { Component, inject } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UserService } from '../../user.service';
// import { Router } from '@angular/router';
// import { UserModel } from '../../user.model';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   private userService = inject(UserService);
//   private router = inject(Router);

//   user: UserModel = {};
//   selectedFile: File | null = null;
//   isCollapsed = false;

//   // Fonction pour gérer la sélection du fichier
//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//     }
//   }

//   ajoutUser() {
//     if (this.isValidProject()) {
//       const formData = new FormData();
//       formData.append('commune_id', this.user.commune_id ? this.user.commune_id.toString() : '');
//       formData.append('prenom', this.user.prenom || '');
//       formData.append('nom', this.user.nom || '');
//       formData.append('date_naissance', this.user.date_naissance || '');
//       formData.append('adresse', this.user.adresse || '');
//       formData.append('CNI', this.user.CNI || '');
//       formData.append('lieu_naissance', this.user.lieu_naissance || '');
//       formData.append('fonction', this.user.fonction || '');
//       formData.append('genre', this.user.genre || '');
//       formData.append('date_integration', this.user.date_integration || '');
//       formData.append('date_sortie', this.user.date_sortie || '');
//       formData.append('telephone', this.user.telephone || '');
//       formData.append('situation_matrimoniale', this.user.situation_matrimoniale || '');
//       formData.append('email', this.user.email || '');
//       formData.append('password', this.user.password || '');
  
//       // Ajouter l'image sélectionnée au FormData
//       if (this.selectedFile) {
//         formData.append('photo', this.selectedFile);
//       }
  
//       this.userService.registerUser(formData).subscribe(
//         (response: any) => {
//           console.log('Réponse du serveur:', response);
//           if (response && response.id) {
//             this.user = {}; // Réinitialiser les champs après la soumission
//           } else {
//             console.error('Réponse du serveur ne contient pas `id`');
//           }
//         },
//         (error: any) => {
//           console.error('Erreur lors de la création de l\'utilisateur', error);
//         }
//       );
//     } else {
//       console.log('Tous les champs obligatoires ne sont pas remplis');
//     }
//   }
  

//   private isValidProject(): boolean {
//     return !!(
//       this.user.prenom &&
//       this.user.commune_id &&
//       this.user.nom &&
//       this.user.email &&
//       this.user.password &&
//       this.user.situation_matrimoniale &&
//       this.user.genre
//     );
//   }
// }


import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { UserModel } from '../../user.model';
import { CommuneService } from '../../../commune.service';
import { communeModel } from '../../commune.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private userService = inject(UserService);
  private communeService = inject(CommuneService); // Service pour obtenir les communes
  private router = inject(Router);

  user: UserModel = {};
  selectedFile: File | null = null;
  communes: communeModel[] = []; // Liste des communes
  isCollapsed = false;
  private localStorage = window.localStorage;


  ngOnInit() {
    this.loadCommunes();
  }
  

  loadCommunes():void {

    const token = this.localStorage.getItem('token');

    if (token){
    this.communeService.getCommunes().subscribe(
      (data: any) => {
        this.communes = data;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des communes', error);
      }
    );
  }}

  // Fonction pour gérer la sélection du fichier
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ajoutUser() {
    if (this.isValidProject()) {
      const formData = new FormData();
      formData.append('commune_id', this.user.commune_id ? this.user.commune_id.toString() : '');
      formData.append('prenom', this.user.prenom || '');
      formData.append('nom', this.user.nom || '');
      formData.append('date_naissance', this.user.date_naissance || '');
      formData.append('adresse', this.user.adresse || '');
      formData.append('CNI', this.user.CNI || '');
      formData.append('lieu_naissance', this.user.lieu_naissance || '');
      formData.append('fonction', this.user.fonction || '');
      formData.append('genre', this.user.genre || '');
      formData.append('date_integration', this.user.date_integration || '');
      formData.append('date_sortie', this.user.date_sortie || '');
      formData.append('telephone', this.user.telephone || '');
      formData.append('situation_matrimoniale', this.user.situation_matrimoniale || '');
      formData.append('email', this.user.email || '');
      formData.append('password', this.user.password || '');

      // Ajouter l'image sélectionnée au FormData
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      this.userService.registerUser(formData).subscribe(
        (response: any) => {
          console.log('Réponse du serveur:', response);
          if (response && response.id) {
            this.user = {}; // Réinitialiser les champs après la soumission
            this.selectedFile = null; // Réinitialiser le fichier sélectionné
          } else {
            console.error('Réponse du serveur ne contient pas `id`');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
        }
      );
    } else {
      console.log('Tous les champs obligatoires ne sont pas remplis');
    }
  }

  private isValidProject(): boolean {
    return !!(
      this.user.prenom &&
      this.user.commune_id &&
      this.user.nom &&
      this.user.email &&
      this.user.password &&
      this.user.situation_matrimoniale &&
      this.user.genre
    );
  }
}
