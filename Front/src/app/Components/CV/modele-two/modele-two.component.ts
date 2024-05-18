import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {jsPDF} from "jspdf";
import {Image} from "../../../Entity/image";

@Component({
  selector: 'app-modele-two',
  templateUrl: './modele-two.component.html',
  styleUrls: ['./modele-two.component.css']
})
export class ModeleTwoComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;
  imageSrc:any;


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
