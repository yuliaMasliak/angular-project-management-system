import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ITask } from 'src/app/models/interfaces'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private http: HttpClient, public modal: ModalServiceService) {}
  tasks: ITask[] = []
  @Input() columnId: any = ''
  @Output() classDesc: string = 'active'
  @Output() editTaskEvent = new EventEmitter()
  @Output() deleteTaskEvent = new EventEmitter()
  ngOnInit(): void {
    console.log(this.columnId)
    let boardId = localStorage.getItem('board_id')!
    this.http
      .get(`${baseUrl}boards/${boardId}/columns/${this.columnId}/tasks`)
      .subscribe((data: any) => {
        data.forEach((el: any) => {
          this.tasks.push(el)
        })

        console.log(data)
      })
  }

  editTask(task: ITask) {
    this.editTaskEvent.emit(task)
  }
  modalDelete(task: ITask) {
    this.deleteTaskEvent.emit(task)
  }
}
