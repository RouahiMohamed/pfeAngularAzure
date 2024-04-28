import { Component, ElementRef, ViewChild } from '@angular/core';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegionService } from '../_services/region.service';
import { AddRegionComponent } from '../Admin/add-region/add-region.component';
interface CanvasItem {
  type: string;
  x: number;
  y: number;
  rotation: number; // Rotation en degrés
}

@Component({
  selector: 'app-drag-dropppp',
  templateUrl: './drag-dropppp.component.html',
  styleUrls: ['./drag-dropppp.component.css']
})
export class DragDroppppComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  items: CanvasItem[] = [];
  selectedItem: CanvasItem | null = null;
  selectedItems: any;
  selectedItemType: string | null = null;
  regions: any[] = [];
  modalRef: MdbModalRef<AddRegionComponent> | null = null;
  onDragStart(event: DragEvent, item: string) {
    event.dataTransfer?.setData("text", item);
  }
  constructor( private modalService: MdbModalService, private regionService: RegionService) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();  // Allow the drop by preventing default behavior.
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData("text");
    if (item) {
      const x = event.clientX;
      const y = event.clientY;
      this.addItemToCanvas(item, x, y);
    }
  }

  addItemToCanvas(itemType: string, x: number, y: number) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const canvasItem: CanvasItem = {
      type: itemType,
      x: x - rect.left,
      y: y - rect.top,
      rotation: 0 // Initial rotation is zero
    };
    this.items.push(canvasItem);
    this.redrawCanvas();
  }

  redrawCanvas() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Clears the canvas
      this.items.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation * Math.PI / 180);
        ctx.fillText(item.type, 0, 0);
        ctx.restore();
      });
    }
  }
  detectClickedItem(event: any): string | null {
    // Implémentez la logique pour déterminer le type de l'élément cliqué
    // Ceci est juste un placeholder
    return 'vmss'; // Supposons que cela retourne 'vmss' pour l'exemple
  }

  openModal(): void {
   
    this.modalRef = this.modalService.open(AddRegionComponent); 
    this.modalRef.onClose.subscribe(() => {
       this.fetchRegions();
     });
   }
   
  fetchRegions(): void {
    this.regionService.getAllRegions().subscribe({
      next: (data) => {
        this.regions = data;
       
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching regions', error);
      }
    });
  }
  canvasClick(event: any) {

    const clickedItemType = this.detectClickedItem(event);
    this.selectedItemType = clickedItemType;
    if (clickedItemType === 'vmss') {
      this.openModal();
    }

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Tente de trouver un élément et assigne null si rien n'est trouvé
    this.selectedItem = this.items.find(item =>
      Math.sqrt((item.x - x) ** 2 + (item.y - y) ** 2) < 10
    ) || null; // Assign null if no item is found
}
}
