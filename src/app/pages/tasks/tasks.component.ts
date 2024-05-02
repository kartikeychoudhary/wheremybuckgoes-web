import { Component } from '@angular/core';
import { Task } from 'src/app/modal/task.modal';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  startTask: Function
  isDataLoaded: boolean;
  transactionsIdIndexMap: {}
  constructor(private taskService:TaskService){

  }
  rowData = [];

  openDialog(): void {
    
  }

  startTaskMethod(params:Task):void {
    console.log()
  }

  ngOnInit(): void {
    this.startTask = this.startTaskMethod.bind(this);
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getAllTasks().subscribe({
      next:(res)=>{
        if(res['status'] === 'OK'){
          this.rowData = res['payload']['RESULT'];
          this.isDataLoaded = true;
        }
      },
      error: (err)=>{

      }
    })
  }
}
