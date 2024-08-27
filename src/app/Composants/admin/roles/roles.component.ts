import { Component, OnInit} from '@angular/core';
import { RoleService } from '../../../Services/adminServices/role/role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  // ... autres propriétés de pagination
}

interface Role {
  id: number;
  name: string;
  permissions: any[]; // Ajustez selon la structure exacte de vos permissions
}


interface Permission {
  id: number;
  name: string;
}


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  roles: Role[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  newRoleName: string = ''; // Nouvelle propriété pour stocker le nom du rôle

  roleEnEdition: Role = { id: 0, name: '', permissions: [] };
  afficherPopupEdition: boolean = false;
  toutesLesPermissions: Permission[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
    this.chargerPermissions();
  }

  chargerPermissions() {
    this.roleService.getPermissions().subscribe(
      (permissions: Permission[]) => {
        this.toutesLesPermissions = permissions;
      },
      erreur => console.error('Erreur lors du chargement des permissions', erreur)
    );
  }


  loadRoles() {
    this.roleService.getRoles().subscribe(
      (response: PaginatedResponse<Role>) => {
        console.log('Response received:', response);
        this.roles = response.data;
        this.currentPage = response.current_page;
        // Calculez le nombre total de pages si nécessaire
        // this.totalPages = ...
        console.log('Roles:', this.roles);
      },
      error => console.error('Erreur lors du chargement des rôles', error)
    );
  }

  addRole() {
    if (this.newRoleName.trim()) { // Vérifie que le champ n'est pas vide
      const newRole = { name: this.newRoleName }; // Crée un objet avec le nom du rôle
      this.roleService.createRole(newRole).subscribe(
        () => {
          this.loadRoles(); // Recharge la liste des rôles après l'ajout
          this.newRoleName = ''; // Réinitialise le champ d'entrée
        },
        error => console.error('Erreur lors de la création du rôle', error)
      );
    } else {
      console.error('Le champ du nom du rôle est vide');
    }
  }


 deleteRole(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle?')) { // Ajouter une confirmation avant la suppression
    this.roleService.deleteRole(id).subscribe(
      () => this.loadRoles(),  // Recharger les rôles après la suppression
      error => console.error('Erreur lors de la suppression du rôle', error)
    );
  }
}


}
