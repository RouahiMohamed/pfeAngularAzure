import { Component, ElementRef, ViewChild } from '@angular/core';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dragdede',
  templateUrl: './dragdede.component.html',
  styleUrl: './dragdede.component.css',
 
})
export class DragdedeComponent {
  items: { item: string, x: number, y: number }[] = [];

  onDragStart(event: DragEvent, item: string) {
    event.dataTransfer?.setData("text", item);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData("text");
    if (item) {
      const canvasX = event.clientX;
      const canvasY = event.clientY;
      this.items.push({ item, x: canvasX, y: canvasY });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}