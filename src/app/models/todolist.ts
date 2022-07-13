// to do list models

export interface toDoItem {
  title: string;
  done: boolean;
  createdTimeStamp: number;
  finishedTimeStamp: number;
}

export interface toDoItemList {
  inProgress: Array<toDoItem>;
  done: Array<toDoItem>;
  pending: Array<toDoItem>;
}
