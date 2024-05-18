import {Component, Inject, OnInit} from '@angular/core';
import {Competance} from "../../../Entity/Competance";
import {CompetanceService} from "../../../Services/competance.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Offres} from "../../../Entity/Offres";

@Component({
  selector: 'app-modifier-competance',
  templateUrl: './modifier-competance.component.html',
  styleUrls: ['./modifier-competance.component.css']
})
export class ModifierCompetanceComponent implements OnInit {

  public competance: Competance ={
    id: 0,
    nom: "",
    niveau: 0
  }
  constructor(private competanceService: CompetanceService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.findCompetance(this.data.id)
  }

  public findCompetance(competanceId: number): void{
    this.competanceService.findCompetanceById(competanceId).subscribe(
        (responce: Competance) => {
          this.competance = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public updateCompetance(competance: Competance): void{
    this.competanceService.updateCompetance(competance).subscribe(
        (response: Competance) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
