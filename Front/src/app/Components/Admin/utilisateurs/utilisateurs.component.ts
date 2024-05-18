import { Component, OnInit } from '@angular/core';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageService} from "../../../Services/image.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ValiderSuppressionUserComponent} from "../valider-suppression-user/valider-suppression-user.component";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  constructor(private userAuthentificationService: UserAuthentificationService,
              private imageService:ImageService,
              private router: Router,
              private dialog: MatDialog) { }

  public recruteurs: any[] = [];
  public candidats: any[] = [];
  p: number = 1;
  itemsPerPage = 5;
  itemsPerPageC = 5;
  ngOnInit(): void {
      this.getAllUsers();
  }

  public getAllUsers(): void{
    this.userAuthentificationService.getAllUsers()
        .subscribe(
        (responce: any) => {
            for (let u of responce){
                if (u.role != 'Admin'){
                    this.imageService.createImage(u);
                    if (u.role == 'Condidat')
                        this.candidats.push(u);
                    else
                        this.recruteurs.push(u)
                }
            }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

    public afficherProfile(idUser: number) {
        this.router.navigate(['/profile'], { queryParams: { id: idUser }});
    }

    public validerSuppressionProfil(role: string, id: number) {
        this.dialog.open(ValiderSuppressionUserComponent, {
            data: {
                role: role,
                idUser: id
            },
        })
    }

}
