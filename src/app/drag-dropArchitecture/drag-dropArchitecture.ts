import { CdkDragDrop, CdkDragMove, DragDropModule, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddDiskComponent } from '../Admin/add-disk/add-disk.component';
import { MatDialog } from '@angular/material/dialog';
import { AddOsMachineComponent } from '../Admin/add-os-machine/add-os-machine.component';
import { ComponentType } from '@angular/cdk/portal';
import { RessourceGroupComponent } from '../ressource-group/ressource-group.component';
import { SubnetComponent } from '../subnet/subnet.component';
import { VmssComponent } from '../vmss/vmss.component';

interface Components {
  name: string;

}

@Component({
  selector: 'app-drag-dropeyaaa',
  templateUrl: './drag-dropeyaaa.component.html',
  styleUrls: ['./drag-dropeyaaa.component.css']
})
export class DragDropeyaaaComponent implements OnInit {
  components = [
    { name: 'Virtual machine', type: 'Virtual machine' , image: "../assets/images/vm.png"},
    { name: 'Application gateway', type: 'Application gateway', image: "../assets/images/ag.png" },
    { name: 'Virtual network', type: 'Virtual network' , image: '../assets/images/vt.png' },
    { name: 'Subnet', type: 'Subnet' , image: "../assets/images/subnet.png" },
    { name: 'RessourceGroup', type: 'ressourceGroup' , image: "../assets/images/rg.png" },
    { name: 'Vmss', type: 'Vmss' ,  image: "../assets/images/vmsss.png" },
  ];
  modalRef: MdbModalRef<AddDiskComponent> | null = null;
  placedComponents: any[] = [];
  constructor(
    private dialog: MatDialog,
    private modalService: MdbModalService
  ) {}
  ngOnInit(): void {}
  openModal(component: any): void {
    console.log("Tentative d'ouverture de modal");
    let modalComponent: ComponentType<any>;
    // Vérifier le nom du composant et définir le composant de modal correspondant
    switch (component.name) {
      case 'Application gateway':
        modalComponent = AddDiskComponent;
        break;
      case 'Virtual machine':
        modalComponent = AddOsMachineComponent;
        break;
        case 'RessourceGroup':
        modalComponent = RessourceGroupComponent;
        break;
        case 'Subnet':
        modalComponent = SubnetComponent;
        break;
        case 'Vmss':
        modalComponent = VmssComponent;
        break;
      default:
        console.error(
          'Aucun composant de modal correspondant pour le composant :',
          component
        );
        return;
    }
    this.modalRef = this.modalService.open(modalComponent);
  }

  onDragMoved(event: CdkDragMove<any>, component: any) {
    component.x = event.pointerPosition.x;
    component.y = event.pointerPosition.y;
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      // Move item in array
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Assuming dropPoint is available or calculate it as needed
      const containerRect =
        event.container.element.nativeElement.getBoundingClientRect();
      const dropPoint = event.dropPoint;

      // Update the item's position
      const item = event.container.data[event.currentIndex];
      item.x = dropPoint.x - containerRect.left;
      item.y = dropPoint.y - containerRect.top;

      const clonedItem = JSON.parse(JSON.stringify(item));
      clonedItem.x = dropPoint.x - containerRect.left;
      clonedItem.y = dropPoint.y - containerRect.top;
      event.container.data.splice(event.currentIndex, 1, clonedItem);

      // Force Angular to detect changes (if necessary)
      this.forceUpdate();
    } else {
      // When transferring from one container to another
      const containerRect =
        event.container.element.nativeElement.getBoundingClientRect();
      const itemRect = event.item.element.nativeElement.getBoundingClientRect();

      // Calculate x and y relative to the design space
      let x = itemRect.left - containerRect.left + event.distance.x;
      let y = itemRect.top - containerRect.top + event.distance.y;

      let clone = JSON.parse(
        JSON.stringify(event.previousContainer.data[event.previousIndex])
      );
      clone.x = x;
      clone.y = y;

      this.placedComponents.splice(event.currentIndex, 0, clone);
    }
  }
  forceUpdate() {
    // Method to trigger change detection manually if needed
    this.placedComponents = [...this.placedComponents];
  }
  getTransform(component: any): string {
    // Implement your rotation logic here (optional)
    return 'rotate(0deg)';
  }

}