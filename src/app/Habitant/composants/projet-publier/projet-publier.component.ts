// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-projet-publier',
//   standalone: true,
//   imports: [],
//   templateUrl: './projet-publier.component.html',
//   styleUrl: './projet-publier.component.css'
// })
// export class ProjetPublierComponent {

// }

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../projet.model';

@Component({
  selector: 'app-projet-publier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projet-publier.component.html',
  styleUrls: ['./projet-publier.component.css']
})
export class ProjetPublierComponent implements OnInit {

  private projetService = inject(ProjetService);
  projets: projetModel[] = [];

  ngOnInit(): void {
    this.fetchProjetsSoumis();
  }

  fetchProjetsSoumis(): void {
    this.projetService.getprojetSoumis({}).subscribe(
      (response: any) => {
        this.projets = response.data; // Assurez-vous que `data` contient la liste des projets soumis
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des projets soumis', error);
      }
    );
  }

  trackByIndex(index: number, projet: projetModel): number {
    return index;
  }
}
