import {Component, OnInit} from '@angular/core';
import {UserAuthentificationService} from "./Services/user-authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Front';

  constructor(private userAuthentificationService: UserAuthentificationService,
              public router: Router){}
  currentItem = 'Television';
  public role: string= "";
  ngOnInit(): void {
    this.role= this.userAuthentificationService.getRole();
  }
  public isLogedIn(){
    return this.userAuthentificationService.isLoggedIn();
  }
}
