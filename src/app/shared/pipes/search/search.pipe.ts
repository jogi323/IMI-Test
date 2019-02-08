import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return [];
    if(!args) return value;
    args = args.toLowerCase();
    return value.filter( item => {
      return item.campaignname.toLowerCase().includes(args.toLowerCase()) || item.refernceid.toLowerCase().includes(args.toLowerCase());
    });
  }

}
