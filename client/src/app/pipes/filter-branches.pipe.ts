import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from 'src/types/general';
import { Status } from '../enums/status';

@Pipe({
  name: 'filterBranches'
})
export class FilterBranchesPipe implements PipeTransform {

  transform(objects:Branch[]):Branch[]{
    if(objects){
      return objects.filter(object=>object.branchStatus === Status.OPEN)
    } else {
      return [];
    }
  }

}
