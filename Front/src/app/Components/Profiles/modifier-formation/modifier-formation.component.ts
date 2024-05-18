import {Component, Inject, OnInit} from '@angular/core';
import {Formation} from "../../../Entity/Formation";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormationService} from "../../../Services/formation.service";
import {Competance} from "../../../Entity/Competance";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.css']
})
export class ModifierFormationComponent implements OnInit {

  public formation: Formation = {
    date: "",
    centre_formation: "",
    titre: "",
    id: 0
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formationService: FormationService) { }

  ngOnInit(): void {
    this.findFormation(this.data.id)
  }

  public findFormation(formationId: number): void{
    this.formationService.findFormationById(formationId).subscribe(
        (responce: Formation) => {
          this.formation = responce;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public updateFormation(formation: Formation): void{
    this.formationService.updateFormation(formation).subscribe(
        (response: Formation) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
