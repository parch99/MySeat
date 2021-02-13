import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyseatPodatkiService } from '../../../myseat-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService, 
              private pot: ActivatedRoute,
              private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  uporabnik: Uporabnik;

  ngOnInit() {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idUporabnika = this.avtentikacijaStoritev.vrniIdTrenutnegaUporabnika();
          return this.myseatPodatkiStoritev.pridobiPodrobnostiUporabnika(idUporabnika);
        })
      )
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
    });
  }

}

export class Uporabnik {
  _id: string;
  ime: string;
  spol: string;
  email: string;
  geslo: string;
  lastnik: string;
  recentlyVisited: any[];
}
