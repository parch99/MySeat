import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'izbrisiId'
})
export class IzbrisiIdPipe implements PipeTransform {
  
  transform(id: string): string {
    if (id == "_id" || id.length > 20) {
      return id = null;
    } else {
      return id;
    }
  }
}
