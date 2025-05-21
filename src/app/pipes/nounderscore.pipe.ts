import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nounderscore'
})
export class NounderscorePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/_/g, ' ');
  }

}
