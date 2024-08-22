
// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { projetModel } from '../../projet.model';
// import { ProjetService } from '../../projet.service';

// @Component({
//   selector: 'app-liste-projets-habitant',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './liste-projets-habitant.component.html',
//   styleUrls: ['./liste-projets-habitant.component.css'] // Correction ici
// })
// export class ListeProjetsHabitantComponent implements OnInit {

//     // Injection de dépendance
//     private projetService = inject(ProjetService);
//     private localStorage = window.localStorage; // Correction ici

//     // Déclaration des variables
//     tabprojet: projetModel[] = [];
//     projetObject: projetModel = {};

//     ngOnInit(): void {
//         this.fetchprojet();
//     }

//     // Fonction pour la récupération des projets
//     fetchprojet(): void {
//         const token = this.localStorage.getItem('token');

//         if (token) {
//             this.projetService.getAllProjet().subscribe(
//                 (response: any) => {
//                     console.log(response.data);
//                     if (response.data) {
//                         this.tabprojet = response.data;
//                     }
//                 },
//                 (error: any) => {
//                     console.log(error);
//                 }
//             );
//         }
//     }
// }


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { projetModel } from '../../projet.model';
import { ProjetService } from '../../projet.service';

@Component({
  selector: 'app-liste-projets-habitant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-projets-habitant.component.html',
  styleUrls: ['./liste-projets-habitant.component.css']
})
export class ListeProjetsHabitantComponent implements OnInit {

    private projetService = inject(ProjetService);
    private localStorage = window.localStorage;

    tabprojet: projetModel[] = [];
    statutSelectionne: boolean | null = null;

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

    afficherProjetsPublies(): void {
        this.statutSelectionne = true;
        this.fetchProjets();
    }

    afficherProjetsNonPublies(): void {
        this.statutSelectionne = false;
        this.fetchProjets();
    }
}
