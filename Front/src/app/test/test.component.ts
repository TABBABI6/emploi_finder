import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Image} from "../Entity/image";
import {NgForm} from "@angular/forms";
import {Test2Component} from "../test2/test2.component";

export interface Competence {
  nom:string,
  id:number,
}
export interface Cv {
  permis: string,
  date_naissance : string,
  titre_professionnel:string,
  competences:Competence,
  date : string,
  num_tel: number,
  nom: string,
  prenom:string,
  poste:string,
  description:string,
  mail:string,
  entreprise:string,
  diplome:string,
  universite:string,
  adresse:string,
  loisirs:string,
  image: Image
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  imageSrc:any;
  imgg:any;
  cptc :Competence={
    id:0,
    nom:"",
  };
  c:string[]=[];
  step: any = 1;

  cv: any= {
    permis: "",
    date_naissance : "",
    titre_professionnel:"",
    competences:"",
    date : "",
    num_tel: 0,
    nom: "",
    prenom:"",
    poste:"",
    description:"",
    mail:"",
    entreprise:"",
    diplome:"",
    universite:"",
    adresse:"",
    loisirs:"",
    image: {
      file: new File([], ""),
      url: ""
    }
  }

  constructor(private route:Router,public dialog: MatDialog) {
  }
  nom:any;
  ngOnInit(): void {
  }
  submit(){
    this.step = this.step +1;
    if(this.step == 6){
      //this.route.navigate(['/modele-two'])
    }
  }
  back(){
    this.step = this.step -1;
  }

  openDialogcv(cv:Cv) {
    this.dialog.open(Test2Component, {height:'600px',data: {
      CV: cv,
        img: this.imgg
    }
    });

  }
  public ajoutCompetance(comp: NgForm){
    var a =Math.random()
    var c={nom:comp.value.cptc,id:a}
    this.cv.competences.push(c)

  }

  supprimer(competences:string){
    this.cv.competences.splice( this.cv.competences.indexOf(competences),1)

  }

  onFileSelected(event: any){
    if (event.target.files){
      const file = event.target.files[0];

      const image: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.imgg=event;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
