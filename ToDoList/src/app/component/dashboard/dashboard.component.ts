import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    
    taskObj : Task = new Task();
    taskArr : Task[] = [];
    
    addTaskValue  : string ="";
    editTaskValue : string ="";
    
    constructor(private crudService : CrudService) {}

     ngOnInit(){
      this.addTaskValue  = "";
      this.editTaskValue = "";
      this.taskObj       = new Task();  
      this.taskArr       = [];
      this.getAllTask();
     }

     getAllTask() {
      this.crudService.getAllTasks().subscribe(
        next => {
          this.taskArr = next;         
        },
          error=>{
            alert("unable to get the list");
          }
      )
     }

     addTask() {
        if(this.addTaskValue =="" || this.addTaskValue==null) {
           alert("Please fill the entry");
        }
        
        else {
          this.taskObj.task_name = this.addTaskValue;
          this.crudService.addTask(this.taskObj).subscribe(
            data => {
              this.Reshresh();            
              this.addTaskValue="";  
            },
            error =>
            {
               alert(error);
            }
          )
        }        
     }

     editTask() {
      this.taskObj.task_name = this.editTaskValue; 
       this.crudService.editTask(this.taskObj).subscribe(
        data => {          
          this.Reshresh();
        },
        error => {
          alert(error);
        }
       )
     }

     deleteTask(eTask : Task) {        
        this.crudService.deleteTask(eTask).subscribe(
          data => {
            this.Reshresh();
          },
          error => 
          {
            alert(error);
          }
        )
     }

     call(etask :Task) {
      this.taskObj = etask;
      this.editTaskValue = etask.task_name;

     }

     Reshresh() { 
      this.taskObj = new Task();  
      this.taskArr = [];
      this.getAllTask();
     }
}
