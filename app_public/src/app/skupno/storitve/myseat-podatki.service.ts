import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Lokacija, Komentar } from '../razredi/lokacija';
import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { environment } from '../../../environments/environment';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';

@Injectable({
  providedIn: 'root'
})
export class MyseatPodatkiService {

  constructor(
    private http: HttpClient,
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage
  ) { }

  private apiUrl = environment.apiUrl;
  public prijava(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('prijava', uporabnik);
  }
  public registracija(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('registracija', uporabnik);
  }
  private avtentikacija(urlNaslov: string, uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
  }
  public sendRecoveryEmail(emailData: any): Promise<any> {
    const url: string = `${this.apiUrl}/send-recovery-email`;
    return this.http
      .post(url, emailData)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  public resetPassword(uporabnik: Uporabnik): Promise<any> {
    const url: string = `${this.apiUrl}/reset-password`;
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  public resetPasswordGetuserid(token: string): Promise<any> {
    const url: string = `${this.apiUrl}/reset-password/${token}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  public pridobiLokacije(lat: number, lng: number): Promise<Lokacija[]> {
    const maxRazdalja: number = 1000;
    const url: string = `${this.apiUrl}/list/lokacije?lng=${lng}&lat=${lat}&maxRazdalja=${maxRazdalja}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Lokacija[])
      .catch(this.obdelajNapako);
  }
  public pridobiPodrobnostiLokacije(idLokacije: string): Promise<Lokacija> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Lokacija)
      .catch(this.obdelajNapako);
  }
  public posodobiLokacijo(idLokacije: string, podatki: Lokacija): Promise<Lokacija> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .put(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Lokacija)
      .catch(this.obdelajNapako);
  }

  public pridobiUporabnike(): Promise<Uporabnik[]> {
    const url: string = `${this.apiUrl}/uporabniki`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik[])
      .catch(this.obdelajNapako);
  }
  public pridobiPodrobnostiUporabnika(idUporabnika: string): Promise<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabnik/${idUporabnika}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik)
      .catch(this.obdelajNapako);
  }

  public dodajKomentarLokaciji(idLokacije: string, podatkiObrazca: Komentar): Promise<Komentar> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}/komentarji`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .post(url, podatkiObrazca, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Komentar)
      .catch(this.obdelajNapako);
  }
  
  public dodajRestoran(podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/list/lokacije`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .post(url, podatkiObrazca, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  public deleteLocation(idLokacije: string): Promise<any> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  public deleteComment(idLokacije: string, idKomentara: string): Promise<Komentar> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}/komentarji/${idKomentara}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Komentar)
      .catch(this.obdelajNapako);
  }
  public editComment(idLokacije: string, idKomentara: string, podatki: Komentar): Promise<Komentar> {
    const url: string = `${this.apiUrl}/lokacije/${idLokacije}/komentarji/${idKomentara}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('myseat-zeton')}`
      })
    };
    return this.http
      .put(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Komentar)
      .catch(this.obdelajNapako);
  }

  public dodajEmail(podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/newsletter`;
    return this.http
      .post(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }
  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka.message || napaka);
    return Promise.reject(napaka.error["sporočilo"] || napaka.error.errmsg || napaka.message || napaka);
  }
}