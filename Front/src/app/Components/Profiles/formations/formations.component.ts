import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Formation} from "../../../Entity/Formation";
import {HttpErrorResponse} from "@angular/common/http";
import {FormationService} from "../../../Services/formation.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {Candidat} from "../../../Entity/Candidat";
import {CandidatService} from "../../../Services/candidat.service";
import {ActivatedRoute} from "@angular/router";
import {ModifierCompetanceComponent} from "../modifier-competance/modifier-competance.component";
import {MatDialog} from "@angular/material/dialog";
import {ModifierFormationComponent} from "../modifier-formation/modifier-formation.component";
import {
    ValiderSuppressionFormationComponent
} from "../valider-suppression-formation/valider-suppression-formation.component";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  public addformations: boolean = false;
  public candidatFormations: Formation[] = [];
  public formation: Formation = {
    date: "",
    centre_formation: "",
    titre: "",
    id: 0
  }

  constructor(private formationService:FormationService,
              private userAuthentificationService:UserAuthentificationService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

    private idUser = 0;
    private idUserConnecte = 0;

  ngOnInit(): void {
      this.route.queryParams
          .subscribe(params => {
              this.idUser = params['id']});
      this.idUserConnecte = this.userAuthentificationService.getUserId();
      this.getUser();
  }

    public isLogedIn(){
        return this.userAuthentificationService.isLoggedIn();
    }
    public proprietaireCompte(){
        if (this.idUser == this.idUserConnecte)
            return true;
        else
            return false;
    }

  public getUser(): void{
    this.candidatService.findCandidatById(this.idUser)
        .subscribe(
            (responce:Candidat) => {
              this.candidatFormations = responce.formations;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

  public addFormations(addFormation: NgForm) {
    this.formationService.addFormation(this.formation).subscribe(
        (response: Formation) => {
          this.addFormationToCandidat(this.userAuthentificationService.getUserId(), response.id)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addFormationToCandidat(candidatId: number, formationId: number): void{
    this.formationService.addFormationToCandidat(candidatId,formationId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }


  public addFormat(): void{
    this.addformations = !this.addformations;
  }

    validerSuppression(id: number) {
        this.dialog.open(ValiderSuppressionFormationComponent, {
            data: {
                id: id
            },
        })
    }

    modifier(id: number) {
        this.dialog.open(ModifierFormationComponent, {
            data: {
                id: id
            },
        })
    }
}
