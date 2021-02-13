import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router,
    private avtentikacijaStoritev: AvtentikacijaService,
    private zgodovinaStoritev: ZgodovinaService,
    private povezavaStoritev: PovezavaService
  ) { }

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
    if (
      !this.prijavniPodatki.ime ||
      !this.prijavniPodatki.elektronskiNaslov ||
      !this.prijavniPodatki.geslo
    ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } else {
      this.izvediRegistracijo();
    }
  }

  private izvediRegistracijo(): void {
    this.avtentikacijaStoritev
      .registracija(this.prijavniPodatki)
      .then(() => {
        const upid: string = this.avtentikacijaStoritev.vrniIdTrenutnegaUporabnika();
        this.router.navigate([`/uporabnik/${upid}`]);
      })
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }
  
  ngOnInit(): void {
  }

}
