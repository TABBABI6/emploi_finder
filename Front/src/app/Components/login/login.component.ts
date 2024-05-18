import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserAuthentificationService} from "../../Services/user-authentification.service";
import {Router} from "@angular/router";
import {InsccriptionComponent} from "../Inscription/insccription/insccription.component";
import {MatDialog} from "@angular/material/dialog";


interface log {
  mail: string;
  mdp: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authentification: log={
    mail: "",
    mdp: ""
  }

  constructor(private userAuthentificationService:UserAuthentificationService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  login(loginForm: NgForm) {
    this.userAuthentificationService.login(this.authentification.mail,this.authentification.mdp).subscribe(
        (response: any) => {
            if (response == null){
                alert("Vérifier vos coordonnées!")
            }
            else {
                this.userAuthentificationService.setUserId(response.id);
                this.userAuthentificationService.setRoles(response.role);

                const role = response.role;
                if (role === 'Condidat') {
                    window.location.reload()
                }
                else if (role == 'Recruteur'){
                    this.router.navigate(['/']);
                    setTimeout(function(){
                        window.location.reload();
                    }, 1);
                }
                else if (role == 'Admin'){
                    this.router.navigate(['/users']);
                    setTimeout(function(){
                        window.location.reload();
                    }, 1);
                }
            }
        },
        (error) => {
          console.log(error);
        }
    );
  }

    openDialogSignin() {
        this.dialog.open(InsccriptionComponent);
    }

}
