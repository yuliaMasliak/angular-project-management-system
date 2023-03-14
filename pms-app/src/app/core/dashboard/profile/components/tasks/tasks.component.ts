import { Component, Input, OnInit } from '@angular/core'
import { ITask } from 'src/app/models/interfaces'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasks: ITask[] = []
  @Input() id: string = ''
  ngOnInit(): void {
    console.log(this.id)
  }
}
