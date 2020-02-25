import { Pipe, PipeTransform } from '@angular/core';
import { Item, InvalidItem } from './types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
    name: 'validItems'
})

export class ValidItemsPipe implements PipeTransform {

    transform(items: Observable<(Item | InvalidItem)[]>, isShowValid: boolean): Observable<(Item | InvalidItem)[]> {
        return items.pipe(
            map((elements: (Item | InvalidItem)[]) => {
                const itemsToReturn: (Item | InvalidItem)[] = [];
                elements.filter((item: (Item | InvalidItem)) => {
                    let isInvalid = (item instanceof InvalidItem);
                    if ((isShowValid && !isInvalid) || (!isShowValid && isInvalid)) {
                        itemsToReturn.push(item);
                    }
                });
                return itemsToReturn;
            })) as Observable<(Item | InvalidItem)[]>;
    }

}
