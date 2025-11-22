import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    let today=new Date();
    let birth=new Date(value);
    let age=today.getFullYear()-birth.getFullYear();
    let month=today.getMonth()-birth.getMonth();
    if(month<0||(month==0&&today.getDate()<birth.getDate()))--age;
    return age;
  }

}
