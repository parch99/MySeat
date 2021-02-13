import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlPrelomVrstice'
})
export class HtmlPrelomVrsticePipe implements PipeTransform {

  transform(besedilo: string): string {
    return besedilo.replace(/\n/g, '<br>');
  }

}
