import { Injectable } from '@angular/core';
import { toDoItem } from '../models/todolist';

@Injectable({
  providedIn: 'root',
})
export class ListProcessService {
  constructor() {}

  filterTargetItemByTitleFronmArray(item: toDoItem, arr: Array<toDoItem>) {
    return arr.filter((filterItem) => filterItem.title != item.title);
  }

  filterTargetItemByIndexFronmArray(i, arr) {
    return arr.filter((undoneItem, index) => index != i);
  }
}
