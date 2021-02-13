import { Component, OnInit, Input } from '@angular/core';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService) { }

  public errorMessage = "";
  public successMessage = "";
  public passwordResetData = {
    password1: "",
    password2: "",
    email: ""
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
    this.errorMessage = "";
    this.successMessage = "";
    this.myseatPodatkiStoritev
      .resetPassword(this.passwordResetData)
      .then((odgovor) => {
        this.successMessage = odgovor.sporočilo;
      })
      .catch(error => this.errorMessage = error);
  }
  
  ngOnInit(): void {
  }
}
