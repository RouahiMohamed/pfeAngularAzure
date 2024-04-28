import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop-canvasssss',
  templateUrl: './drag-drop-canvasssss.component.html',
  styleUrl: './drag-drop-canvasssss.component.css'
})
export class DragDropCanvasssssComponent implements OnInit {
  components = [
    { name: 'Conteneur', type: 'container' },
    { name: 'Calcul', type: 'compute' },
    { name: 'Réseau', type: 'network' },
    { name: 'Stockage', type: 'storage' },
    { name: 'Base de données', type: 'database' },
    { name: 'Sécurité et identité', type: 'security' },
    { name: 'Outils', type: 'tools' },
    { name: 'IA', type: 'ai' },
    { name: 'Analyse', type: 'analytics' }
  ];
  placedComponents: any[] = [];

  ngOnInit() {
  }

  onDrop(event: CdkDragDrop<any[], any[], any>): void {
    if (event.previousContainer === event.container) {
      // Si le déplacement se fait dans le même container, on réarrange simplement les éléments
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Sinon, on fait une copie de l'élément vers le nouveau container
      copyArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);
    }
  }
  getTransform(component: any): string {
    // Implement your rotation logic here
    // Example (placeholder for now):
    return 'rotate(0deg)';  // Initial rotation (no rotation)
  }
}