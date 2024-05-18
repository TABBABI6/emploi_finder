import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TestNiveau} from "../../../Entity/TestNiveau";
import {DatePipe} from "@angular/common";
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import { DOCUMENT } from '@angular/common';

export interface Score{
    dateTest: string,
    score: number,
    resultat:boolean,

}
@Component({
  selector: 'app-afficher-test',
  templateUrl: './afficher-test.component.html',
  styleUrls: ['./afficher-test.component.css'],
    providers: [DatePipe]

})

export class AfficherTestComponent implements OnInit {

    duree: number = 0;
    myDate = new Date();
    date: any;
    boutton!: HTMLElement;
  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private testNiveauService: TestNiveauService,
              private userAuthentificationService: UserAuthentificationService,
              private router: Router,
              @Inject(DOCUMENT) document: Document) {
      this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')

  }

  public idtest!: number;
  public idoffre!: number;
  public idrec!: number;
  public test: TestNiveau={
      id:0,
      titre:"",
      score_min:0,
      questions:[],
      nb_questions:0,
      duree:0,
      scoreTests:[]
  };
  private vrais = 0;
  public role = "";

  ngOnInit(): void {
      this.role= this.userAuthentificationService.getRole();
    this.route.queryParams
        .subscribe(params => {
          this.idtest = params['idt'];
          this.idrec = params['idr'];
          this.idoffre = params['ido'];

        });
    this.getTestById(this.idtest);
  }

    public getTestById(idTest: number){
        this.testNiveauService.findTestById(idTest).subscribe(
            (responce:TestNiveau) => {
                this.test = responce;
                this.duree = responce.duree;
                if (this.userAuthentificationService.getRole()=='Condidat'){
                    setTimeout(() =>{
                        alert("Durée treminée!")
                        this.boutton = document.getElementById('confirm') as HTMLElement;
                        this.boutton.click();
                        this.router.navigate(['/detailOffre'], { queryParams: { idO: this.idoffre , idR: this.idrec} });
                        }, this.test.duree * 3600000);
                }
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


    public verifier(form: any){
      for (let question of this.test.questions){
          if (form.value[question.enance.toString()] == question.rep_vrai[0]){
              this.vrais+=1;
          }
      }
      var score = this.vrais * (100 / this.test.nb_questions);
      var resultat = false;
      if (score >= this.test.score_min){
          resultat = true;
      }
      this.addScoreTest(score, resultat);


    }


    public addScoreTest(score: number, resultat: boolean){
      var scr: Score={
          dateTest:this.date,
          score: score,
          resultat: resultat
      }
        this.testNiveauService.addscore(scr).subscribe(
            (responce:any) => {
                this.testNiveauService.addScoreToTest(this.test.id,responce.id,this.userAuthentificationService.getUserId())
                    .subscribe(
                        (responce:any) => {
                            this.router.navigate(['/detailOffre'], { queryParams: { idO: this.idoffre , idR: this.idrec} });
                        },
                        (error: HttpErrorResponse) => {
                            alert(error.message);
                        });
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


}
