import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  onDragStart(event: DragEvent, itemType: string) {
    const draggedElement = (event.target as HTMLElement).closest('.sidebar-item');
    if (draggedElement) {
      const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
      event.dataTransfer!.effectAllowed = 'copy'; // Allow only copy operation
      event.dataTransfer!.setData('text/plain', clonedElement.outerHTML);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    // Add visual feedback to drop zone on hover (using CSS :hover pseudo-class)
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedElementData = event.dataTransfer!.getData('text/plain');
    const droppedElement = document.createElement('div');
    droppedElement.innerHTML = droppedElementData;
    this.elementRef.nativeElement.querySelector('.drawing-grid').appendChild(droppedElement.firstChild);
  }
}
