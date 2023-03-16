import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(tasks: string[], searchInput: string): any[] {
    if (!searchInput) {
      return []
    }
    searchInput = searchInput.toLowerCase()
    return tasks.filter((x) => x.toLowerCase().includes(searchInput))
  }
}
