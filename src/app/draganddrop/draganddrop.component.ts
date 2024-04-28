import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,

} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrl: './draganddrop.component.css',
})
export class DraganddropComponent {
  sidebarItems = ['Item 1', 'Item 2', 'Item 3'];
  canvasItems = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}

function moveItemInArray(array: string[], fromIndex: number, toIndex: number) {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}

function transferArrayItem(fromArray: string[], toArray: string[], fromIndex: number, toIndex: number) {
  const item = fromArray.splice(fromIndex, 1)[0];
  toArray.splice(toIndex, 0, item);
}

