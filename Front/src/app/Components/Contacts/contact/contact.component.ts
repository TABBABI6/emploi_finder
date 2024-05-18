import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MsgContactComponent} from "../msg-contact/msg-contact.component";
import {Contact} from "../../../Entity/Contact";
import {ContactService} from "../../../Services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: Contact = {
    email: "",
    message: "",
    name: "",
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private contactService: ContactService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public sendContact(addForm: NgForm) {
    console.log(this.contact)
    this.contactService.send(this.contact).subscribe(
        (response: any) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {

        }
    );
  }

  send() {
    this.dialog.open(MsgContactComponent)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
