import { Component, OnInit} from '@angular/core';

import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { GeoLokacijaService } from '../../storitve/geo-lokacija.service'
import { Lokacija } from '../../razredi/lokacija';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-seznam-lokacij',
  templateUrl: './seznam-lokacij.component.html',
  styleUrls: ['./seznam-lokacij.component.css']
})
export class SeznamLokacijComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService,
              private geoLokacijaStoritev: GeoLokacijaService,
              private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  public lokacije: Lokacija[];
  public sporocilo: string;

  private pridobiLokacije = (polozaj: any): void => {
    this.sporocilo = "Iščem bližnje zanimive lokacije.";
    const lat: number = polozaj.coords.latitude;
    const lng: number = polozaj.coords.longitude;
    this.myseatPodatkiStoritev
      .pridobiLokacije(lat, lng)
      .then(najdeneLokacije => {
        this.sporocilo = najdeneLokacije.length > 0 ? "" : "Ni najdenih lokacij.";
        this.lokacije = najdeneLokacije;
      });
  }
  private prikaziNapako = (napaka: any): void => {
    this.sporocilo = napaka.message;
  }
  private niGeolokacije = (): void => {
    this.sporocilo = "Spletni brskalnik ne podpira geolociranja.";
  }
  private pridobiPolozaj = (): void => {
    this.sporocilo = "Pridobivam trenutni položaj odjemalca ...";
    this.geoLokacijaStoritev.pridobiLokacijo(
      this.pridobiLokacije.bind(this),
      this.prikaziNapako.bind(this),
      this.niGeolokacije.bind(this)
    )
  }

  public obrazecNapaka: string;
  public obrazecZaRestPrikazan: boolean = false;
  public novRestoran = {
    naziv: '',
    naslov: '',
    koordinatelng: null,
    koordinatelat: null,
    mondayfriday: '',
    saturday: '',
    sunday: '',
    phone: ''
  };
  public dodajNovRestoran(): void {
    this.obrazecNapaka = "";
    if (this.soPodatkiUstrezniZaRest()) {
      this.myseatPodatkiStoritev
        .dodajRestoran(this.novRestoran)
        .then(restoran => {
          console.log("Restoran shranjen", restoran);
          this.ponastaviInSkrijObrazec();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }
  private soPodatkiUstrezniZaRest(): boolean {
    if (this.novRestoran.naziv && this.novRestoran.naslov && this.novRestoran.phone && this.novRestoran.koordinatelng
      && this.novRestoran.koordinatelat && this.novRestoran.saturday && this.novRestoran.sunday && this.novRestoran.mondayfriday) {
      return true;
    } else {
      return false;
    }
  }
  private ponastaviInSkrijObrazec(): void {
    this.obrazecZaRestPrikazan = false;
    this.novRestoran.naziv = "";
    this.novRestoran.naslov = "";
    this.novRestoran.phone = "";
    this.novRestoran.koordinatelng = 0;
    this.novRestoran.koordinatelat = 0;
    this.novRestoran.mondayfriday = "";
    this.novRestoran.saturday = "";
    this.novRestoran.sunday = "";
  }
  searchText;
  
  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }
  ngOnInit(): void {
    this.pridobiPolozaj();
  }
}

