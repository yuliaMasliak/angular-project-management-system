import { Component, Input } from '@angular/core'
import { IColumn } from 'src/app/models/interfaces'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent {
  @Input() columns: IColumn[] = []
}
