import { Component, OnInit } from '@angular/core';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService) { }
  
  public errorMessage: string = "";
  public successMessage: string = "";
  public resetEmailData = {
    elektronskiNaslov: ""
  }
  public sendEmailData(): void {
    this.errorMessage = "";
    if (!this.resetEmailData.elektronskiNaslov)
      this.errorMessage = "All fields are required!";
    else {
      this.sendEmail();
    }
  }
  
  public sendEmail(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.myseatPodatkiStoritev
        .sendRecoveryEmail(this.resetEmailData)
        .then((message) => {
          console.log(message);
          this.successMessage = "Check your email";
        })
        .catch(napaka => this.errorMessage = napaka);
  }

  ngOnInit(): void {
    
  }
}

