import { Component } from '@angular/core';
import {Task} from "../dto/task";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent {
  taskList: Array<Task> = [];

  constructor(private http: HttpClient) {
    http.get<Array<Task>>('http://localhost:8080/app/api/v1/tasks')
      .subscribe(taskList =>{
        this.taskList = taskList;
      });
  }

  saveTask(txt: HTMLInputElement) {
    if (!txt.value.trim()) {
      txt.select();
      return;
    }

    this.http.post<Task>('http://localhost:8080/app/api/v1/tasks',
      new Task(0, txt.value.trim(), "NOT_COMPLETED"))
      .subscribe(task => {
        this.taskList.push(task);
        txt.value = '';
        txt.focus();
      });
  }
}
