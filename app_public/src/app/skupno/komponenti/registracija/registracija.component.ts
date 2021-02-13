import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(
    private usmerjevalnik: Router,
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
    this.napakaNaObrazcu = "";/*
    const geslo = event.target.querySelector('#geslo').value;
    const gesloVerify = event.target.querySelector('#gesloVerify').value;
    if(geslo != gesloVerify){
      this.napakaNaObrazcu = "Passwords do not match";
    } */
    if (
      !this.prijavniPodatki.ime ||
      !this.prijavniPodatki.elektronskiNaslov ||
      !this.prijavniPodatki.geslo
    ) {
      this.napakaNaObrazcu = "All fields are required!";
    } else {
      this.izvediRegistracijo();
    }
  }

  private izvediRegistracijo(): void {
    this.avtentikacijaStoritev
      .registracija(this.prijavniPodatki)
      .then(() => {
        this.usmerjevalnik.navigateByUrl(this.zgodovinaStoritev.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije());
      })
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

  ngOnInit(): void {
  }

}
