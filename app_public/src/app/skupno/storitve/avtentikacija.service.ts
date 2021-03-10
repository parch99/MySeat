import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { MyseatPodatkiService } from '../storitve/myseat-podatki.service';

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
    private myseatPodatkiStoritev: MyseatPodatkiService
  ) { }

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };
  
  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    if (zeton) {
      const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      return koristnaVsebina.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public vrniTrenutnegaUporabnika(): Uporabnik {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { ime, elektronskiNaslov} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      return { ime, elektronskiNaslov} as Uporabnik;
    }
  }
  
  public vrniIdTrenutnegaUporabnika(): string {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id } = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      const id: string = _id.toString();
      return id as string;
    }
  }

  public async prijava(uporabnik: Uporabnik): Promise<any> {
    return this.myseatPodatkiStoritev
      .prijava(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }
  public googlePrijava(token: string) {
      this.shraniZeton(token);
  }
  public facebookPrijava(token: string) {
    this.shraniZeton(token);
}
  public async registracija(uporabnik: Uporabnik): Promise<any> {
    return this.myseatPodatkiStoritev
      .registracija(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      })
  }
  public odjava(): void {
    this.shramba.removeItem('myseat-zeton');
  }

  public vrniZeton(): string {
    return this.shramba.getItem('myseat-zeton');
  }
  public shraniZeton(zeton: string): void {
    this.shramba.setItem('myseat-zeton', zeton);
  }
}