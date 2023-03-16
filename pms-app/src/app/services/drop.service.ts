import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop'
import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { IColumn, ITask } from '../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class DropService {
  dropLists: any = []
  currentHoverDropListId?: string
  constructor(@Inject(DOCUMENT) private document: Document) {}

  register(dropList: ITask[]) {
    this.dropLists.push(dropList)
    console.log(this.dropLists)
  }
  dragMoved(event: CdkDragMove<IColumn>) {
    let elementFromPoint = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y
    )

    if (!elementFromPoint) {
      this.currentHoverDropListId = undefined
      return
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list')

    if (!dropList) {
      this.currentHoverDropListId = undefined
      return
    }

    this.currentHoverDropListId = dropList.id
  }

  dragReleased(event: CdkDragRelease) {
    this.currentHoverDropListId = undefined
  }
}
