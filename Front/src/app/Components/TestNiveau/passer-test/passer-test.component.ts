import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passer-test',
  templateUrl: './passer-test.component.html',
  styleUrls: ['./passer-test.component.css']
})
export class PasserTestComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit(): void {
  }


  ouvrirtest(){
    this.router.navigate(['/test'], { queryParams: { idt: this.data.test.id, ido: this.data.idoffre, idr: this.data.idrec} });

  }
}
