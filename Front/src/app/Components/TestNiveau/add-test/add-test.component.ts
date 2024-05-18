import { Component, OnInit ,VERSION} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {TestNiveauService} from "../../../Services/test-niveau.service";
import {QuestionService} from "../../../Services/question.service";
import {TestNiveau} from "../../../Entity/TestNiveau";
import {Question} from "../../../Entity/Question";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {UserAuthentificationService} from "../../../Services/user-authentification.service";
import {Recruteur} from "../../../Entity/Recruteur";
import {RecruteurService} from "../../../Services/recruteur.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {

  public test: TestNiveau={
      id: 0,
      titre:"",
      questions: [],
      nb_questions: 0,
      duree: 0,
      score_min: 0,
      scoreTests: []
  };
  public tests: TestNiveau[] = [];
  public addtest: boolean= false;

  constructor(private testNiveauService: TestNiveauService,
              private questionService: QuestionService,
              private userAuthentificationService: UserAuthentificationService,
              private recruteurService: RecruteurService,
              private router: Router) { }

    form!: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            question: new FormArray([
                new FormGroup({
                    enance: new FormControl(''),
                    rep_vrai: new FormControl(''),
                    rep_faux1: new FormControl(''),
                    rep_faux2: new FormControl(''),
                    rep_faux3: new FormControl('')                })
            ])
        });
        this.getRecruteur();
    }

    get question(): FormArray {
        return this.form.get('question') as FormArray;
    }

    addquestion() {
        this.question.push(
            new FormGroup({
                enance: new FormControl(''),
                rep_vrai: new FormControl(''),
                rep_faux1: new FormControl(''),
                rep_faux2: new FormControl(''),
                rep_faux3: new FormControl('')
            })
        );
    }

  public addTest() {
        this.test.nb_questions= this.form.value.question.length;
    this.testNiveauService.addTest(this.test).subscribe(
        (response: TestNiveau) => {
          for (let q of this.form.value.question){
              let qstn={
                  id: 0,
                  enance: q.enance,
                  rep_vrai:[q.rep_vrai],
                  rep_faux:[q.rep_faux1,q.rep_faux2,q.rep_faux3]
              }
            this.addQuest(response.id, qstn)
          }
          this.addTestToUser(this.userAuthentificationService.getUserId(),response.id);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addQuest(idtest: number, question: Question) {
    this.questionService.addQuestion(question).subscribe(
        (response: Question) => {
          this.addQuestionToTest(idtest, response.id)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public addQuestionToTest(idtest: number, idquestion: number) {
    this.testNiveauService.addQuestionToTest(idtest,idquestion).subscribe(
        (response: TestNiveau) => {},
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

    public addTestToUser(iduser: number, idtest: number) {
        if (this.userAuthentificationService.getRole()=='Recruteur'){
            this.testNiveauService.addTestToRecruteur(iduser,idtest).subscribe(
                (response: Recruteur) => {
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
        }else if (this.userAuthentificationService.getRole()=='Admin'){
            this.testNiveauService.addTestToAdmin(iduser,idtest).subscribe(
                (response: any) => {
                },
                (error: HttpErrorResponse) => {
                    alert(error.message);
                }
            );
        }
    }




    ajoutTest() {
        this.addtest = !this.addtest;
    }


    public getRecruteur() {
        this.recruteurService.findRecruteurtById(this.userAuthentificationService.getUserId()).subscribe(
            (response: Recruteur) => {
                this.tests = response.testNiveaus;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public getDetailsTest(idtest: number) {
        this.router.navigate(['/test'], { queryParams: { idt: idtest} });
    }


    public deleteTest(id: number): void{
        this.testNiveauService.deleteTest(id).subscribe(
            (response: void) => {
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

}
