import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit} from '@angular/core';
interface Components {
  name: string;
}
@Component({
  selector: 'app-drag-dropeyaaa',
  templateUrl: './drag-dropeyaaa.component.html',
  styleUrls: ['./drag-dropeyaaa.component.css']
})
export class DragDropeyaaaComponent implements OnInit  {
  ngOnInit(): void {
   
  }
  components: Components[] = [
    { name: 'Component 1' },
    { name: 'Component 2' },
    { name: 'Component 3' }
  ];

  placedComponents: Component[] = [];

  onDrop(event: CdkDragDrop<Component>) {
    const component = event.previousContainer.data;
    this.placedComponents.push(component);
  }
}

