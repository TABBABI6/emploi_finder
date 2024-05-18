import {Component, Inject, OnInit} from '@angular/core';
import {Image} from "../../../Entity/image";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ModeleOneComponent} from "../modele-one/modele-one.component";
import {ModeleTwoComponent} from "../modele-two/modele-two.component";
export interface Competence {
  nom:string,
  id:number,
}
export interface LOISIR {
  nom:string,
  id:number,
}
export interface FORMATIONS {
  diplome:string,
  univ:string,
  date:string,
  id:number,

}
export interface EXPERIENCES {
  poste:string,
  entreprise:string,
  dates:string,
  id:number,

}
export interface Cv {
  permis: string,
  date_naissance : string,
  titre_professionnel:string,
  competences:Competence[],
  formations:FORMATIONS[],
  experiences:EXPERIENCES[],
  date : string,
  num_tel: number,
  nom: string,
  prenom:string,
  description:string,
  mail:string,
  adresse:string,
  loisirs:LOISIR[],
  image: Image
}
@Component({
  selector: 'app-formulaire-cv',
  templateUrl: './formulaire-cv.component.html',
  styleUrls: ['./formulaire-cv.component.css']
})
export class FormulaireCVComponent implements OnInit {

  imageSrc:any;
  imgg:any;
  cptc :Competence={
    id:0,
    nom:"",
  };
  c:string[]=[];
  loi:LOISIR={
    id:0,
    nom:"",
  };
  x:string[]=[];

  formul:FORMATIONS={
    diplome:"",
    univ:"",
    date:"",
    id:0,

  };
  y:string[]=[];
  exp:EXPERIENCES={
    poste:"",
    entreprise:"",
    dates:"",
    id:0,

  };
  z:string[]=[];

  step: any = 1;

  cv: any= {
    id : 0,
    permis: "",
    date_naissance : "",
    titre_professionnel:"",
    competences:[],
    formations:[],
    experiences:[],
    date : "",
    num_tel: 0,
    nom: "",
    prenom:"",
    description:"",
    mail:"",
    adresse:"",
    loisirs:[],
    image: {
      file: new File([], ""),
      url: ""
    }
  }

  constructor(private route:Router,public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  Name:any;
  nom:any;
  univ:any;
  date:any;
  poste:any;
  entreprise:any;
  dates:any;
  ngOnInit(): void {
  }
  submit(){
    this.step = this.step +1;
    if(this.step == 6){
      this.route.navigate(['/modele-two'])
    }
  }
  back(){
    this.step = this.step -1;
  }

  openDialogcv(cv:Cv) {
    if (this.data.id == 1) {
      this.dialog.open(ModeleOneComponent, {
        height: '700px', data: {
          CV: cv,
          img: this.imgg
        }
      });

    } else if (this.data.id== 2) {
      this.dialog.open(ModeleTwoComponent, {
        height: '600px', data: {
          CV: cv,
          img: this.imgg
        }
      });
    }
  }

  public ajoutCompetance(comp: NgForm){
    var a =Math.random()
    var c={nom:comp.value.cptc,id:a}
    this.cv.competences.push(c)
  }

  supprimer(competences:string){
    this.cv.competences.splice( this.cv.competences.indexOf(competences),1)

  }

  public ajoutLoisir(lois: NgForm){
    var a =Math.random()
    var x={nom:lois.value.loi,id:a}
    this.cv.loisirs.push(x)
  }

  supprimerLoisir(loisirs:string){
    this.cv.loisirs.splice( this.cv.loisirs.indexOf(loisirs),1)

  }


  public ajoutFormation(form1: NgForm){
    var a =Math.random()
    var y:FORMATIONS={
      diplome:form1.value.diplome,
      univ:form1.value.univ,
      date:form1.value.date,
      id:a,
    }
    this.cv.formations.push(y)
  }

  supprimerFormation(formations:string){
    this.cv.formations.splice( this.cv.formations.indexOf(formations),1)

  }


  public ajoutExperience(form3: NgForm){
    var a =Math.random()
    var z:EXPERIENCES={
      poste:form3.value.poste,
      entreprise:form3.value.entreprise,
      dates:form3.value.dates,
      id:a,
    }
    this.cv.experiences.push(z)
  }

  supprimerExperience(experiences:string){
    this.cv.experiences.splice( this.cv.experiences.indexOf(experiences),1)

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
