import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})

export class PrijavaComponent implements OnInit {
  
  constructor(
    private usmerjevalnik: Router,
    private avtentikacijaStoritev: AvtentikacijaService,
    private zgodovinaStoritev: ZgodovinaService,
    private povezavaStoritev: PovezavaService,
    private route: ActivatedRoute
  ) {
    if (this.usmerjevalnik.url.startsWith('/prijava/google')) {
      this.route.params.subscribe(event => {
        this.avtentikacijaStoritev.googlePrijava(event.token)
        this.usmerjevalnik.navigate(['/seznam-lokacije']);
       });
    }
    if (this.usmerjevalnik.url.startsWith('/prijava/facebook')) {
      this.route.params.subscribe(event => {
        this.avtentikacijaStoritev.facebookPrijava(event.token)
        this.usmerjevalnik.navigate(['/seznam-lokacije']);
       });
    }
   }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public napakaNaObrazcu: string = "";
  public prijavniPodatki = {
    ime: "",
    elektronskiNaslov: "",
    geslo: ""
  }

  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    if (!this.prijavniPodatki.elektronskiNaslov || !this.prijavniPodatki.geslo ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } else {
      this.izvediPrijavo();
    }
  }
  private izvediPrijavo(): void {
    this.avtentikacijaStoritev
      .prijava(this.prijavniPodatki)
      .then(() => {
        this.usmerjevalnik.navigateByUrl(
          this.zgodovinaStoritev.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
        )
      })
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

  ngOnInit() {
  }

}
