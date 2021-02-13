import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLokacijaService {

  constructor() { }

  public pridobiLokacijo(pkUspesno, pkNapaka, pkNiLokacije): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pkUspesno, pkNapaka);
    } else {
      pkNiLokacije();
    }
  }
}
