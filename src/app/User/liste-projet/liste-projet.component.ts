import { Component, inject } from '@angular/core';
import { ProjetService } from '../../Maire/projet.service';
import { projetModel } from '../../Maire/projet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-projet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-projet.component.html',
  styleUrl: './liste-projet.component.css'
})
export class ListeProjetComponent {

  private projetService =inject(ProjetService);
    private localStorage = window.localStorage;
  
    tabprojet: projetModel[] = [];
  
    ngOnInit(): void {
      this.fetchProjetsPublies();
    }
  
    fetchProjetsPublies(): void {
      const token = this.localStorage.getItem('token');
  
      if (token) {
        this.projetService.getProjetBySatut(true).subscribe(
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
