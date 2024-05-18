import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {Recruteur} from "../../../Entity/Recruteur";
import {NgForm} from "@angular/forms";
import {RecruteurService} from "../../../Services/recruteur.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Image} from "../../../Entity/image";

@Component({
  selector: 'app-inscription-recruteur',
  templateUrl: './inscription-recruteur.component.html',
  styleUrls: ['./inscription-recruteur.component.css']
})
export class InscriptionRecruteurComponent implements OnInit {

  recruteur: Recruteur= {
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    image: {
      file : new File([],""),
      url : ""
    },
    role: "",
    id: 0,
    offres: [],
    num_tel: 0,
    testNiveaus: []
  }
  constructor(private  recruteurService: RecruteurService) { }

  ngOnInit(): void {
  }

  public addRecruteur(addForm: NgForm): void{
    const recruteurFormData = this.prepareFormData(this.recruteur)
    this.recruteurService.addRecruteur(recruteurFormData).subscribe(
        (response: Recruteur) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  prepareFormData(recruteur: Recruteur): FormData{
    const formData = new FormData();
    formData.append(
        'recruteur',
        new Blob([JSON.stringify(recruteur)], {type: 'application/json'})
    );
    formData.append(
        'imageFile',
        recruteur.image.file,
        recruteur.image.file.name
    );
    return formData;
  }

  onFileSelected(event: any){
    if (event.target.files){
      const file = event.target.files[0];

      const image: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.recruteur.image=image;
    }
  }
}
