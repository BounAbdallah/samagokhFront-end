import { Component, inject, OnInit } from '@angular/core';
import { ListeProjetSoumisComponent } from "../liste-projet-soumis/liste-projet-soumis.component";
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../../Habitant/projet.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-page-liste-projet-soumis',
  standalone: true,
  imports: [ListeProjetSoumisComponent,SideBarComponent,CommonModule ],
  templateUrl: './page-liste-projet-soumis.component.html',
  styleUrl: './page-liste-projet-soumis.component.css'
})
export class PageListeProjetSoumisComponent implements OnInit {

  private projetctService = inject(ProjetService);
  tabprojet: projetModel[] = [];
  private localStorage = window.localStorage;


ngOnInit(): void {
  this.loadproject()
    
}

loadproject() {
  const token = this.localStorage.getItem('token');
  if (token){
  this.projetctService.getAllProjets().subscribe(
    (response: any) => {
      this.tabprojet = response.data;
    },
    (error: any) => {
      console.error('Erreur lors du chargement des communes', error);
    }
  );
}}

}
