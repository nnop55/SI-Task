import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy'): any {
    if (!value) {
      return value;
    }
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format);
  }

}
