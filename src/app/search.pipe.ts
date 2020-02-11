import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      if(it.name)
        return it.name.toLowerCase().includes(searchText);

      if(it.text)
        return it.text.toLowerCase().includes(searchText);
    });
   }


}
