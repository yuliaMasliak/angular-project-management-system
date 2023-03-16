import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgInitDirective } from './ng-init.directive';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [
    NgInitDirective,
    SearchPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
