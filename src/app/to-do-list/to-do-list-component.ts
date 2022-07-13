import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { toDoItem, toDoItemList } from '../models/todolist';
import { LocalService } from '../localService';
import { ListProcessService } from '../tools/list-process.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list-component.html',
  styleUrls: ['./to-do-list-component.css'],
})
export class ToDoListComponent implements OnInit {
  constructor(
    private localService: LocalService,
    private listProcessService: ListProcessService
  ) {}

  @Input() itemPlaceHolder: string;
  @Output() broadcastList = new EventEmitter();
  task: toDoItem = {
    title: '',
    done: false,
    createdTimeStamp: 0,
    finishedTimeStamp: 0,
  };
  list: toDoItemList =
    JSON.parse(this.localService.getData('toDoItemList')) != null
      ? JSON.parse(this.localService.getData('toDoItemList'))
      : {
          inProgress: [],
          done: [],
          pending: [],
        };
  displayList: Array<toDoItem> = [];
  displayState: boolean = false;

  ngOnInit() {
    if (this.localService.getData('toDoItemList') == null) {
      this.localService.saveData('toDoItemList', JSON.stringify(this.list));
    } else {
      console.log(
        'from storage is',
        JSON.parse(this.localService.getData('toDoItemList'))
      );
    }
    this.displayList = this.list.inProgress;
  }

  initInput() {
    this.task = {
      title: '',
      done: false,
      createdTimeStamp: 0,
      finishedTimeStamp: 0,
    };
  }

  initLists() {
    this.list = {
      inProgress: [],
      done: [],
      pending: [],
    };
  }

  updateList() {
    this.localService.saveData('toDoItemList', JSON.stringify(this.list));
    this.displayList = this.list.inProgress;
    this.broadcastList.emit(this.list);
  }

  onKeydown(e) {
    this.task.createdTimeStamp = Math.floor(Number(new Date()) / 1000);
    this.list.inProgress.push(this.task);
    this.updateList();
    this.initInput();
  }

  toggleDone(i, item) {
    console.log(i, item, this.list, this.displayList);
    item.done = !item.done;
    item.finishedTimeStamp = Math.floor(Number(new Date()) / 1000);
    if (item.done) {
      this.list.done.push(item);
      this.list.inProgress =
        this.listProcessService.filterTargetItemByIndexFronmArray(
          i,
          this.list.inProgress
        );
    } else {
      this.list.inProgress.push(item);
      this.list.done =
        this.listProcessService.filterTargetItemByTitleFronmArray(
          item,
          this.list.done
        );
    }
    this.updateList();
  }

  getList() {
    this.displayState = !this.displayState;
    console.log('list', this.list);
    this.displayList = this.displayState
      ? this.list.inProgress.concat(this.list.done)
      : this.list.inProgress;
    console.log(this.list);
  }

  clearList() {
    this.initLists();
    this.updateList();
    this.localService.clearData();
  }

  delete(e, item, i) {
    e.stopPropagation();
    if (item.done) {
      this.list.done =
        this.listProcessService.filterTargetItemByTitleFronmArray(
          item,
          this.list.done
        );
    } else {
      this.list.inProgress =
        this.listProcessService.filterTargetItemByIndexFronmArray(
          i,
          this.list.inProgress
        );
    }
    this.updateList();
  }

  edit(e, item) {
    e.stopPropagation();
    this.task = item;
  }
}
