
import { Component, inject } from '@angular/core';

import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { UserModel } from '../../user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

// injection des dependences

private userService = inject(UserService);

private router = inject(Router);

userObjet:UserModel = {}

connexion(){
  console.log(this.userObjet);
  // if(this.userObjet.email && this.userObjet.password){
  //   this.userService.login(this.userObjet).subscribe(
  //     (response:any)=>{
  //       console.log(response);
  //       this.router.navigate(['/home'])
  //     }
  //   )
  }

}
