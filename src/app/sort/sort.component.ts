import { Component } from '@angular/core';
// import { MatInputModule } from '@angular/material/'

interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'select-overview-example',
  templateUrl: './select-overview-example.html',
  styleUrls: ['./sort.component.css'],
})
export class SelectOverviewExample {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
