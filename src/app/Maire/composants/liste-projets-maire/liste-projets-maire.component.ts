

import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../../Habitant/projet.model';

@Component({
  selector: 'app-liste-projets-maire',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './liste-projets-maire.component.html',
  styleUrls: ['./liste-projets-maire.component.css']
})
export class ListeProjetsMaireComponent implements OnInit {

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