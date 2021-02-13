import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { Lokacija } from '../../razredi/lokacija';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-stran-s-podrobnostmi',
  templateUrl: './stran-s-podrobnostmi.component.html',
  styleUrls: ['./stran-s-podrobnostmi.component.css']
})
export class StranSPodrobnostmiComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService,
              private pot: ActivatedRoute
  ) { }

  lokacija: Lokacija;
  
  ngOnInit() {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idLokacije = params.get('idLokacije');
          return this.myseatPodatkiStoritev.pridobiPodrobnostiLokacije(idLokacije);
        })
      )
      .subscribe((lokacija: Lokacija) => {
        this.lokacija = lokacija;
    });
  }
}
