// join-labels.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinLabels',
})
export class JoinLabelsPipe implements PipeTransform {
  transform(labels: string[] | null, separator: string = ', '): string {
    return labels ? labels.join(separator) : '';
  }
}
