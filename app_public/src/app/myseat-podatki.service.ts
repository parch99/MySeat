import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Uporabnik } from './skupno/komponenti/home-user/home-user.component';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyseatPodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  
  public pridobiPodrobnostiUporabnika(idUporabnika: string): Promise<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabnik/${idUporabnika}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik)
      .catch(this.obdelajNapako);
  }
  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
