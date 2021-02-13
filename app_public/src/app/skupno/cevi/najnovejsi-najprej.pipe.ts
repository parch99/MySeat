import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'najnovejsiNajprej'
})
export class NajnovejsiNajprejPipe implements PipeTransform {

  transform(komentarji: any[]): any[] {
    if (komentarji && komentarji.length > 0) {
      return komentarji.sort((a, b) => {
        return (a.datum > b.datum) ? -1 : 1;
      });
    }
    return null;
  }

}
