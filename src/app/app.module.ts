import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ToDoListComponent } from './to-do-list/to-do-list-component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HeaderComponent, ToDoListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
