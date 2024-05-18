import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../../Services/candidat.service";
import {Offres} from "../../../Entity/Offres";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {map} from "rxjs";
import {ImageService} from "../../../Services/image.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offres-recommander',
  templateUrl: './offres-recommander.component.html',
  styleUrls: ['./offres-recommander.component.css']
})
export class OffresRecommanderComponent implements OnInit {

  constructor(private candidatService: CandidatService,
              private userAuthentificationService: UserAuthentificationService,
              private recruteurService:RecruteurService,
              private imageService: ImageService,
              private router: Router) { }


  public p: number = 1;
  public centered = false;
  public unbounded = false;
  public checked = false;
  public disabled = false;
  public Offres = new Map<Offres,Recruteur>;


  ngOnInit(): void {
    this.getRecruteurs();
  }

  public getRecruteurs(): void{
    this.candidatService.findOffresForCandidat(this.userAuthentificationService.getUserId())
        .subscribe(
            (responce:Offres[]) => {
              for (let offre of responce){
                this.recruteurService.findRecruteurByIdOffre(offre.id)
                    .pipe(map(p => this.imageService.createImage(p)))
                    .subscribe(
                        (responce:Recruteur) => {
                          this.Offres.set(offre,responce);
                        },
                        (error: HttpErrorResponse) => {
                          alert(error.message);
                        });
              }
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

    public getDetails(idO: number, idR: number) {
        this.router.navigate(['/detailOffre'], { queryParams: { idO: idO , idR: idR} });
    }

}
