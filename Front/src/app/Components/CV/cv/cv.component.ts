import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormulaireCVComponent} from "../formulaire-cv/formulaire-cv.component";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  constructor(private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
  openDialogcv(id:number) {
    this.dialog.open(FormulaireCVComponent, {
      data: {
        id:id
      }
    })

  }

}
