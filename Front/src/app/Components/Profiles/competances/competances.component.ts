import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Competance} from "../../../Entity/Competance";
import {HttpErrorResponse} from "@angular/common/http";
import {CompetanceService} from "../../../Services/competance.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {Candidat} from "../../../Entity/Candidat";
import {CandidatService} from "../../../Services/candidat.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModifierCompetanceComponent} from "../modifier-competance/modifier-competance.component";
import {ValiderSuppressionComponent} from "../../Offre/valider-suppression/valider-suppression.component";
import {
    ValiderSuppressionCompetanceComponent
} from "../valider-suppression-competance/valider-suppression-competance.component";

@Component({
  selector: 'app-competances',
  templateUrl: './competances.component.html',
  styleUrls: ['./competances.component.css']
})
export class CompetancesComponent implements OnInit {

  public candidatCompetances: Competance[]=[]
  public addcompetances : boolean = false;
  public competance: Competance = {
    id: 0,
    nom: "",
    niveau: 0,
  }
    private idUser = 0;
    private idUserConnecte = 0;

  constructor(private competanceService: CompetanceService,
              private userAuthentificationService:UserAuthentificationService,
              private candidatService:CandidatService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

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
              this.candidatCompetances = responce.competances;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }

  public addCompetance(addForm: NgForm) {
    this.competanceService.addCompetance(this.competance).subscribe(
        (response: Competance) => {
          this.addCompetanceToCandidat(this.userAuthentificationService.getUserId(), response.id)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
  public addCompetanceToCandidat(candidatId: number, competanceId: number): void{
    this.competanceService.addCompetanceToCandidat(candidatId,competanceId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }
  public addComp(): void{
    this.addcompetances = !this.addcompetances;
  }

    validerSuppression(id: number) {
        this.dialog.open(ValiderSuppressionCompetanceComponent, {
            data:{
                id: id
            },
        })
    }

    public modifier(id: number) {
        this.dialog.open(ModifierCompetanceComponent, {
            data:{
                id: id
            },
        })
    }
}
