import { Component, VERSION, Input } from '@angular/core';
import { toDoItemList } from './models/todolist';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() broadcastList: toDoItemList;
  name = 'Angular ' + VERSION.major;
  itemPlaceHolder: string = 'Add your task here...';

  broadcastTodoList(e) {
    console.log(e);
  }
}
