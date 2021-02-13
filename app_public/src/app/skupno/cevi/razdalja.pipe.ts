import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'razdalja'
})
export class RazdaljaPipe implements PipeTransform {

  transform(razdalja: number): string {
    const jeStevilo = function(stevilo) {
      return !isNaN(parseFloat(stevilo)) && isFinite(stevilo);
    }

    if (razdalja && jeStevilo(razdalja)) {
      let enota = 'm';
      let prikazanaRazdalja = '0';
      if (razdalja > 1) {
        prikazanaRazdalja = razdalja.toFixed(1);
        enota = 'km';
      } else {
        prikazanaRazdalja = Math.round(razdalja * 1000).toString();
      }
      return prikazanaRazdalja + ' ' + enota;
    } else {
      return '?';
    }
  }

}