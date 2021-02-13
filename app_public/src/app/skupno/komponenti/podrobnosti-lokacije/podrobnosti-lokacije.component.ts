import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { Lokacija, Komentar } from '../../razredi/lokacija';
import { MyseatPodatkiService } from '../../storitve/myseat-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-podrobnosti-lokacije',
  templateUrl: './podrobnosti-lokacije.component.html',
  styleUrls: ['./podrobnosti-lokacije.component.css']
})

export class PodrobnostiLokacijeComponent implements OnInit {

  constructor(private myseatPodatkiStoritev: MyseatPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,
              private povezavaStoritev: PovezavaService,
              private router: Router) { }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
  
  public novKomentar: Komentar = {
    naziv: '',
    ocena: 5,
    cost: 3,
    komentar: ''
  };
  public obrazecPrikazan: boolean = false;
  public obrazecNapaka: string;
  private soPodatkiUstrezni(): boolean {
    if (this.novKomentar.naziv && this.novKomentar.ocena && this.novKomentar.komentar && this.novKomentar.cost) {
      return true;
    } else {
      return false;
    }
  }
  private ponastaviInSkrijObrazec(): void {
    this.obrazecPrikazan = false;
    this.novKomentar.naziv = "";
    this.novKomentar.ocena = 5;
    this.novKomentar.cost = 3;
    this.novKomentar.komentar = "";
  }
  public dodajNovKomentar(): void {
    this.obrazecNapaka = "";
    this.novKomentar.naziv = this.vrniUporabnika();
    if (this.soPodatkiUstrezni()) {
      this.myseatPodatkiStoritev
        .dodajKomentarLokaciji(this.lokacija._id, this.novKomentar)
        .then((komentar: Komentar) => {
          console.log("Komentar shranjen", komentar);
          let komentarji = this.lokacija.komentarji.slice(0);
          komentarji.unshift(komentar);
          this.lokacija.komentarji = komentarji;
          this.ponastaviInSkrijObrazec();
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }

  public obrazecZaPosodobitevLokacije: boolean = false;
  public posodobitev = {
    naziv: '',
    naslov: '',
    koordinatelng: null,
    koordinatelat: null,
    mondayfriday: '',
    saturday: '',
    sunday: '',
    phone: ''
  };
  public posodobiL(): void{
    this.obrazecNapaka = "";
    this.myseatPodatkiStoritev.posodobiLokacijo(this.lokacija._id, this.posodobitev)
    .then((lokacija: Lokacija) => {
      console.log("Posodobljeno", lokacija);
      window.location.reload();
    })
    .catch(napaka => this.obrazecNapaka = napaka);
  }
  
  public deleteL(): void{
    this.obrazecNapaka = "";
    this.myseatPodatkiStoritev.deleteLocation(this.lokacija._id)
      .then((lokacija: Lokacija) => {
        console.log("Deleted", lokacija);
        this.router.navigate(['/seznam-lokacije']);
      })
      .catch(napaka => this.obrazecNapaka = napaka);
  }
  public deleteC(commentid: string): void {
    this.obrazecNapaka = "";
    this.myseatPodatkiStoritev.deleteComment(this.lokacija._id, commentid)
      .then((komentar: Komentar) => {
         console.log("Comment deleted", komentar);
         const url: string = `/lokacija/${this.lokacija._id}`;
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate([url]));
      })
      .catch(napaka => this.obrazecNapaka = napaka);
  }
  public updateCpodatki = {
    ocena: 5,
    komentar: '',
  };
  public obrazecPrikazanZaC: boolean = false;
  public editC(commentid: string): void {
    this.obrazecNapaka = "";
    this.myseatPodatkiStoritev.editComment(this.lokacija._id, commentid, this.updateCpodatki)
      .then((komentar: Komentar) => {
         console.log("Comment successfully edited", komentar);
         const url: string = `/lokacija/${this.lokacija._id}`;
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate([url]));
      })
      .catch(napaka => this.obrazecNapaka = napaka);
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }
  public vrniUporabnika(): string {
    const { ime } = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return ime ? ime : 'Gost';
  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  @Input() lokacija: Lokacija;
  ngOnInit() {
    
  }

}

export class Uporabnik {
  _id?: string;
  ime: string;
  spol?: string;
  elektronskiNaslov?: string;
  //lastnik?: string;
  komentarji?: Komentar;
  recentlyVisited?: any[];
}