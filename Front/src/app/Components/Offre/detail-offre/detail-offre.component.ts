import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../../Services/offre.service";
import {config, map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Offres} from "../../../Entity/Offres";
import {Recruteur} from "../../../Entity/Recruteur";
import {ImageService} from "../../../Services/image.service";
import {RecruteurService} from "../../../Services/recruteur.service";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Candidat} from "../../../Entity/Candidat";
import {MatDialog} from "@angular/material/dialog";
import {ValiderSuppressionPostulationComponent} from "../../Profiles/valider-suppression-postulation/valider-suppression-postulation.component";
import {LoginComponent} from "../../login/login.component";
import {PostulationService} from "../../../Services/postulation.service";
import {Postulation} from "../../../Entity/Postulation";
import {AddPostulationComponent} from "../add-postulation/add-postulation.component";
import {Score} from "../../TestNiveau/afficher-test/afficher-test.component";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.css']
})
export class DetailOffreComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private offreService: OffreService,
              private imageService: ImageService,
              private recruteurService: RecruteurService,
              private userAuthentificationService: UserAuthentificationService,
              private router: Router,
              private candidatService: CandidatService,
              private dialog: MatDialog,
              private postulationService: PostulationService,
              private testNiveauService: TestNiveauService,
              config: NgbCarouselConfig) {
      config.showNavigationArrows = true;
      config.showNavigationIndicators = false;
  }

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
  public recruteur: Recruteur= {
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
      testNiveaus:[]
  }

  private idO = 0;
  private idR = 0;
  id = 0;
  idCandidat =0
  postuler = true;
  public postulation: Postulation= {
      id: 0,
      date_postulation: "2022-01-01",
      decision_recruteur: "en attente",
      cv: {
          file: new File([], ""),
          url: ""
      },
      lettre_motivation: {
          file: new File([], ""),
          url: ""
      }
  }

  idPostulation = 0;
  public candidatPostulation = new Map<any,any>;

  public Candidat: any = {
      adresse: "",
      competances: [],
      cv: {
          file: new File([], ""),
          url: ""
      },
      date_naissance: "",
      fonction: "",
      formations: [],
      id: 0,
      image: {
          file: new File([], ""),
          url: ""
      },
      lettre_motivation: {
          file: new File([], ""),
          url: ""
      },
      mail: "",
      mdp: "",
      nom: "",
      postulations: [],
      prenom: "",
      resultat: 0
  };
    score: Score[]=[];
  public candidatAccepter= 0;
  public candidatRefuser=0;
  public role: string = "";
  ngOnInit(): void {
    this.role = this.userAuthentificationService.getRole();
    this.route.queryParams
        .subscribe(params => {
          this.idO = params['idO']
          this.idR = params['idR']});
    this.getOffre();
    this.getRecruteur();
    this.id = this.userAuthentificationService.getUserId();
    this.idCandidat = this.userAuthentificationService.getUserId();
    if (this.isLogedIn() && this.role == 'Condidat'){
        this.getCandidatById(this.id);
    }
  }

  public getOffre(): void{
    this.offreService.findOffreById(this.idO).subscribe(
        (responce:Offres) => {
              this.offre = responce;
              for (let i of this.offre.postulations){
                  this.imageService.createCv(i)
                  this.imageService.createLm(i)
                  if (i.decision_recruteur == 'Accepté'){
                      this.candidatAccepter=1+this.candidatAccepter;
                  }
                  else if (i.decision_recruteur == 'Refusé'){
                      this.candidatRefuser=1+this.candidatRefuser;
                  }
                  this.candidatService.findCandidatsByIdPostulation(i.id)
                      .pipe(map(p => this.imageService.createImage(p)))
                      .subscribe(
                          (responce:Candidat) => {
                              this.Candidat = responce;
                              if (this.offre.testNiveaus.length>0){
                                  this.testNiveauService.getScoreByIdCandidat(this.Candidat.id).subscribe(
                                      (response: Score[]) => {
                                          this.score = response;
                                          for (let score of this.score){
                                              if (this.offre.testNiveaus[0].scoreTests.indexOf(score)){
                                                  this.Candidat.resultat = score.score;
                                              }
                                          }

                                      },
                                      (error: HttpErrorResponse) => {
                                          alert(error.message);
                                      }
                                  );
                              }
                              this.candidatPostulation.set(this.Candidat,i);
                          },
                          (error: HttpErrorResponse) => {
                              alert(error.message);
                          }
                      );
            }
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }



  public getRecruteur(): void{
    this.recruteurService.findRecruteurtById(this.idR)
        .pipe(map(p => this.imageService.createImage(p)))
        .subscribe(
            (responce:Recruteur) => {
              this.recruteur = responce;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
  }


  public afficherProfile(idUser: number) {
    this.router.navigate(['/profile'], { queryParams: { id: idUser }});
  }


    public addPostulation(candidatId: number,offreId: number): void{
        if (this.isLogedIn()){
            this.dialog.open(AddPostulationComponent, {
                data: {
                    candidatId: candidatId,
                    offreId: offreId,
                    recid: this.idR
                },
            })
        }
        else this.openLogin();

    }

  public getCandidatById(idCandidat: number){
    this.candidatService.findCandidatById(idCandidat).subscribe(
        (responce:Candidat) => {
            this.Candidat = responce;
            this.offreService.findOffreById(this.idO)
                .subscribe(
                    (responce: Offres) => {
                        this.postule(this.Candidat.postulations,responce.postulations);
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

  public postule(postulationCandidat: Postulation[], postulationOffre: Postulation[]){
    for (let i of postulationCandidat){
        for (let j of postulationOffre){
            if (i.id == j.id){
                this.postuler = false
                this.idPostulation = i.id;
            }
        }
    }
  }

    public deletePostulation() {
        this.dialog.open(ValiderSuppressionPostulationComponent, {
            data: {
                id: this.idPostulation
            },
        })
    }

    public isLogedIn(){
        return this.userAuthentificationService.isLoggedIn();
    }

    public isRecruteur(){
      if (this.userAuthentificationService.getUserId() == this.idR)
          return true;
        else return false;
    }

    openLogin() {
        this.dialog.open(LoginComponent);
    }


    public updatePostulation(decision: string, id: number): void{
        this.postulationService.findPostulationById(id).subscribe(
            (response: Postulation) => {
                let p = response;
                p.decision_recruteur = decision;
                this.postulationService.updatePostulation(p).subscribe(
                    (response: Postulation) => {
                        window.location.reload();
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

    public afficherCV(url: any) {
        window.open(url);
    }
    public afficherLM(url: any) {
        window.open(url);
    }
}
