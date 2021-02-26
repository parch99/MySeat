import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../razredi/uporabnik';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService, private pot: ActivatedRoute,
              private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  uporabnik: Uporabnik;

  ngOnInit() {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          console.log(params);
          let idUporabnika = params.get('idUporabnika')
          return this.myseatPodatkiStoritev.pridobiPodrobnostiUporabnika(idUporabnika);
        })
      )
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
    });
  }

}

