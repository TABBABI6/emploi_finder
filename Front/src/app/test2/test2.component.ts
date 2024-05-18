import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {jsPDF} from "jspdf";
import {Cv} from "../test/test.component";
import {Image} from "../Entity/image";

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;
  imageSrc:any;
  cv: Cv= {
    permis: "",
    date_naissance : "",
    titre_professionnel:"",
    competences:{nom:"",id:0},
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
    },
  }

  constructor(private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any) {}




  ngOnInit(): void {
    this.affichageimg()
  }
  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'A4'); // A2 size page of PDF
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("cv.pdf"); // Generated PDF
      }
    });
  }

  affichageimg(){
    if (this.data.img.target.files){
      const file = this.data.img.target.files[0];

      const image: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
