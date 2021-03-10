import { Component, OnInit, Input } from '@angular/core';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../razredi/uporabnik';
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  @Input() uporabnik: Uporabnik;

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,
              private povezavaStoritev: PovezavaService,
              private zgodovinaStoritev: ZgodovinaService) { }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
  
  public uporabniki: Uporabnik[];
  
  private pridobiUporabnike = (): void => {
    this.myseatPodatkiStoritev
      .pridobiUporabnike()
      .then(najdeniUporabniki => {
        this.uporabniki = najdeniUporabniki;
      });
  }
  
  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
  }
  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }
  public vrniUporabnika(): string {
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return uporabnik ? uporabnik.ime : 'Gost';
  }
  public vrniId(): string {
    const _id = this.avtentikacijaStoritev.vrniIdTrenutnegaUporabnika();
    return _id;
  }

  public obrazecNapaka: string;
  public obrazecUspesno: string;
  public email = {
    elektronskiNaslov: ''
  };
  public dodajNovEmail(): void {
    this.obrazecNapaka = "";
    this.obrazecUspesno = "";
    if (this.soPodatkiUstrezniZaEmail()) {
      this.myseatPodatkiStoritev
        .dodajEmail(this.email)
        .then(emaill => {
          console.log("Email shranjen", emaill);
          this.obrazecUspesno = "Successfully subscribed";
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Field can not be empty !";
    }
  }
  private soPodatkiUstrezniZaEmail(): boolean {
    if (this.email.elektronskiNaslov) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    //setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    //this.pridobiUporabnike();
  }

}
