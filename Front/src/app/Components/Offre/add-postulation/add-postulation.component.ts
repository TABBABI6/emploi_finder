import {Component, Inject, OnInit} from '@angular/core';
import {Postulation} from "../../../Entity/Postulation";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../../Services/candidat.service";
import {PostulationService} from "../../../Services/postulation.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Image} from "../../../Entity/image";
import {DatePipe} from "@angular/common";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {OffreService} from "../../../Services/offre.service";
import {Offres} from "../../../Entity/Offres";
import {OffresComponent} from "../offres/offres.component";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {Candidat} from "../../../Entity/Candidat";
import {Router} from "@angular/router";
import {Score} from "../../TestNiveau/afficher-test/afficher-test.component";
import {PasserTestComponent} from "../../TestNiveau/passer-test/passer-test.component";
import {TestNiveau} from "../../../Entity/TestNiveau";

@Component({
  selector: 'app-add-postulation',
  templateUrl: './add-postulation.component.html',
  styleUrls: ['./add-postulation.component.css'],
  providers: [DatePipe]
})
export class AddPostulationComponent implements OnInit {

  resultat:number = -1;
  valider!: boolean;
  score: Score[] = [];
  myDate = new Date();
  date: any;
  public offre: Offres={
    id: 0,
    titre: "",
    date_ajout: "",
    date_expiration: "",
    description: "",
    domaine: "",
    type_poste: "",
    lieu: "",
    experience: "",
    etude: "",
    salaire: 0,
    disponibilite: "",
    postulations: [],
    testNiveaus:[]
  };
  constructor(private candidatService: CandidatService,
              private postulationService: PostulationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe,
              private userAuthentificationService: UserAuthentificationService,
              private offreService:OffreService,
              private testNiveauService:TestNiveauService,
              private router: Router,
              private dialog: MatDialog) {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  public postulation: any= {
    id: 0,
    date_postulation: "",
    decision_recruteur: "en attente"
  }

  public cv: Image = {
    file: new File([], ""),
    url: ""
  }
  public lettre_motivation: Image = {
    file: new File([], ""),
    url: ""
  }

  public ajoutCV: boolean = false;
  public ajoutLM: boolean = false;

  ngOnInit(): void {
    this.getOffre();
    this.getScoreByIdCandidat();
  }

  onDragOverCV(event:any) {
    event.preventDefault();
  }

  onDropSuccessCV(event:any) {
    event.preventDefault();

    this.addCV(event.dataTransfer.files);
  }
  onChangeCV(event:any) {
    this.addCV(event.target.files);
  }

  onDragOverLM(event:any) {
    event.preventDefault();
  }

  onDropSuccessLM(event:any) {
    event.preventDefault();

    this.addLM(event.dataTransfer.files);
  }
  onChangeLM(event:any) {
    this.addLM(event.target.files);
  }

  public addPostulation(candidatId: number,offreId: number): void{
    this.postulation.date_postulation = this.date;
    this.postulationService.addPostulation(this.postulation).subscribe(
        (response: Postulation) => {
          if (this.ajoutCV) {
            this.updatePostulationCV(response);
          }
          if (this.ajoutLM) {
            this.updatePostulationLM(response);
          }
          this.addPostulationToCandidat(candidatId, offreId, response.id)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addPostulationToCandidat(candidatId: number, offreId: number, postulationId: number): void{
    this.candidatService.addPostulationToCandidat(candidatId,offreId,postulationId).subscribe(
        (response: void) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public updatePostulationCV(postulation: any): void{
    postulation.cv = this.cv;
    const cvFormData = this.prepareFormDataCv(postulation)
    this.postulationService.updatePostulationCV(cvFormData).subscribe(
        (response: Postulation) => {},
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  prepareFormDataCv(postulation: Postulation): FormData{
    const formData = new FormData();
    formData.append(
        'postulation',
        new Blob([JSON.stringify(postulation)], {type: 'application/json'})
    );
    formData.append(
        'cv',
        postulation.cv.file,
        postulation.cv.file.name
    );
    return formData;
  }

  public updatePostulationLM(postulation: any): void{
    postulation.lettre_motivation = this.lettre_motivation;
    const lmFormData = this.prepareFormDataLM(postulation)
    this.postulationService.updatePostulationLM(lmFormData).subscribe(
        (response: Postulation) => {},
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  prepareFormDataLM(postulation: Postulation): FormData{
    const formData = new FormData();
    formData.append(
        'postulation',
        new Blob([JSON.stringify(postulation)], {type: 'application/json'})
    );
    formData.append(
        'lm',
        postulation.lettre_motivation.file,
        postulation.lettre_motivation.file.name
    );
    return formData;
  }

  public addCV(files: File[]){
    if (files){
      const file = files[0];

      const cv: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.cv=cv;
      this.ajoutCV= true
    }
  }
  public addLM(files: File[]){
    if (files){
      const file = files[0];

      const lm: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.lettre_motivation=lm;
      this.ajoutLM= true;
    }
  }

  public confirm(): boolean{
    if (this.ajoutCV && this.ajoutLM){
      return false;
    }
    return true;
  }


  public getOffre(): void{
    this.offreService.findOffreById(this.data.offreId).subscribe(
        (response: Offres) => {
          this.offre = response
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public getScoreByIdCandidat(): void{
    this.testNiveauService.getScoreByIdCandidat(this.userAuthentificationService.getUserId()).subscribe(
        (response: Score[]) => {
          this.score = response;

          this.offreService.findOffreById(this.data.offreId).subscribe(
              (response: Offres) => {
                for (let score of this.score){
                  if (response.testNiveaus[0].scoreTests.indexOf(score)){
                    this.resultat = score.score;
                    if (score.score >= response.testNiveaus[0].score_min)
                      this.valider = true;
                  }

                }

              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
          );
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public getDetailsTest(test: TestNiveau, idoffre: number, idrec: number) {
    this.dialog.open(PasserTestComponent, {
      data: {
        test: test,
        idoffre: idoffre,
        idrec: idrec
      },
    })
  }




}
