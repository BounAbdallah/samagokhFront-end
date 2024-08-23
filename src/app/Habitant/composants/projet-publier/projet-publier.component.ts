import { CommonModule } from '@angular/common';


import { Component, inject } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../projet.model';
@Component({
  selector: 'app-projet-publier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projet-publier.component.html',
  styleUrl: './projet-publier.component.css'
})
export class ProjetPublierComponent {

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

    

}

