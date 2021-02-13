import { Injectable } from '@angular/core';
import { merge, fromEvent, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PovezavaService {
  public jePovezava: boolean = false;
  constructor() {
    merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }))
      .subscribe(povezano => this.jePovezava = povezano);
  }
}