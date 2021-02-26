import { Component, OnInit } from '@angular/core';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService, private route: ActivatedRoute) {}

  public token: string;
  public email: string;
  public errorMessage = "";
  public successMessage = "";
  public passwordResetData = {
    password1: "",
    password2: ""
  }
  public prijavniPodatki = {
    ime: "",
    elektronskiNaslov: "",
    geslo: ""
  }
  public checkPasswordMatch(): void {
    this.errorMessage = "";
    if(!this.passwordResetData.password1 || !this.passwordResetData.password2)
      this.errorMessage = "Fields can not be empty";
    else if(this.passwordResetData.password1 != this.passwordResetData.password2)
      this.errorMessage = "Passwords dont match";
    else
      this.initializePasswordReset();
  }
  
  private initializePasswordReset(): void {
    this.prijavniPodatki.elektronskiNaslov = this.email;
    this.prijavniPodatki.geslo = this.passwordResetData.password1;
    this.errorMessage = "";
    this.successMessage = "";
    this.myseatPodatkiStoritev
      .resetPassword(this.prijavniPodatki)
      .then((odgovor) => {
        this.successMessage = odgovor.sporočilo;
      })
      .catch(error => this.errorMessage = error);
  }
  
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.myseatPodatkiStoritev.resetPasswordGetuserid(this.token)
      .then(user => {
        this.email = user.user.elektronskiNaslov;
        console.log(user.user.elektronskiNaslov);
      })
      .catch(error => this.errorMessage = error);
  }
}
