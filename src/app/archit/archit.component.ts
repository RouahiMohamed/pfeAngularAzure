import { ComponentType } from '@angular/cdk/portal';
import { RessourceGroupComponent } from '../ressource-group/ressource-group.component';
import { SubnetComponent } from '../subnet/subnet.component';
import { VmssComponent } from '../vmss/vmss.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CdkDragDrop, CdkDragMove, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApplicationGatewayComponent } from '../application-gateway/application-gateway.component';
import { VirtualMachineComponent } from '../virtual-machine/virtual-machine.component';
import { VirtualNetworkComponent } from '../virtual-network/virtual-network.component';
import { LocalStorageService } from 'ngx-webstorage';
import { ArchitectureService } from '../_services/architecture.service';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';

interface Components  {
  name: string;
}
@Component({
  selector: 'app-archit',
  templateUrl: './archit.component.html',
  styleUrl: './archit.component.css'
})
export class ArchitComponent implements OnInit{
  @ViewChild('designSpaceList') designSpaceList!: CdkDropList;
currentUser: any;
pulumiCode!: string;
terraformCode!: string;
architectureId!: string ;
selectedCodeType: string = 'pulumi'; 
costEstimation: any;
  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  components = [
    { name: 'Virtual machine', type: 'Virtual machine' , image: "../assets/images/vm.png", id: this.generateId() },
    { name: 'Application gateway', type: 'Application gateway', image: "../assets/images/ag.png", id: this.generateId() },
    { name: 'Virtual network', type: 'Virtual network' , image: '../assets/images/vt.png', id: this.generateId() },
    { name: 'Subnet', type: 'Subnet' , image: "../assets/images/subnet.png", id: this.generateId() },
    { name: 'RessourceGroup', type: 'ressourceGroup' , image: "../assets/images/rg.png", id: this.generateId() },
    { name: 'Vmss', type: 'Vmss' ,  image: "../assets/images/vmsss.png", id: this.generateId() },
  ];
  modalRef: MdbModalRef<any> | null = null;
  placedComponents: any[] = [];
  constructor(private localStorage: LocalStorageService ,private architectureService: ArchitectureService,
        private modalService: MdbModalService, private storageService: StorageService,
        private http: HttpClient) {}
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
  
  openModal(component: any): void {
    console.log("Tentative d'ouverture de modal");
    let modalComponent: ComponentType<any>;
    // Vérifier le nom du composant et définir le composant de modal correspondant
    switch (component.name) {
      case 'Application gateway':
        modalComponent = ApplicationGatewayComponent;
        break;
      case 'Virtual machine':
        modalComponent = VirtualMachineComponent;
        break;
        case 'RessourceGroup':
        modalComponent = RessourceGroupComponent;
        break;
        case 'Subnet':
        modalComponent = SubnetComponent;
        break;
        case 'Virtual network':
        modalComponent = VirtualNetworkComponent;
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
    if (!component.id) {
      component.id = this.generateId();
    }
    this.modalRef = this.modalService.open(modalComponent, {
      data: { component: component, placedComponents: this.placedComponents }
    });  
    }

    onDragMoved(event: CdkDragMove<any>, component: any) {
      const designSpaceRect = this.designSpaceList.element.nativeElement.getBoundingClientRect();
      let x = event.pointerPosition.x;
      let y = event.pointerPosition.y;
    
      // Vérifiez si x et y sont à l'intérieur de l'espace de conception
      if (x >= designSpaceRect.left && x <= designSpaceRect.right && y >= designSpaceRect.top && y <= designSpaceRect.bottom) {
        component.x = x;
        component.y = y;
      }
    }

  onDrop(event: CdkDragDrop<any[]>): void {
    const designSpaceRect = this.designSpaceList.element.nativeElement.getBoundingClientRect();
    const dropPoint = event.dropPoint;
  
    // Vérifiez si le point de dépôt est à l'intérieur de l'espace de conception
    if (dropPoint.x >= designSpaceRect.left && dropPoint.x <= designSpaceRect.right && dropPoint.y >= designSpaceRect.top && dropPoint.y <= designSpaceRect.bottom) {
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
      this.placedComponents[event.currentIndex].resetForm();
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
      clone.id = this.generateId();
      this.placedComponents.splice(event.currentIndex, 0, clone);
    }
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
  createArchitecture():void {
    const architecture = {
      name: 'My Architecture',  
      dateCreation: new Date(),
      user: this.currentUser?.id,
      resourceGroups: [] as any[],  
      vmsses: []as any[],
      virtualMachines: []as any[],
      virtualNetworks: []as any[],
      applicationGateways: []as any[],
      subnets: []as any[]
    };

    for (const component of this.placedComponents) {
          switch (component.type) {
        case 'ressourceGroup':
          let formDat = this.localStorage.retrieve('resourceGroupData' + component.id);
          if (formDat) {
            formDat.id= component.id, 
            formDat.user= this.currentUser?.id;
            architecture.resourceGroups.push(formDat);
          }
          break;
        case 'Virtual machine':
          let formDataa = this.localStorage.retrieve('virtualMachineData' + component.id);
          if (formDataa) {
            formDataa.id= component.id,
          formDataa.user = this.currentUser?.id;
          architecture.virtualMachines.push(formDataa);
        }
          break;
        case 'Application gateway':
          let formDataaa = this.localStorage.retrieve('applicationGatewayData' + component.id);
          if (formDataaa) {
            formDataaa.id= component.id,
          formDataaa.user = this.currentUser?.id;
          architecture.applicationGateways.push(formDataaa);
        }
          break;
        case 'Virtual network':
          let formDa = this.localStorage.retrieve('virtualNetworkData' + component.id);
          if (formDa) {
            formDa.id= component.id,
          formDa.user = this.currentUser?.id;
          architecture.virtualNetworks.push(formDa);
        }
          break;
        case 'Subnet':
          let formD = this.localStorage.retrieve('subnetData' + component.id);
          if (formD) {
            formD.id= component.id,
          formD.user = this.currentUser?.id;
          architecture.subnets.push(formD);
        }
          break;
        case 'Vmss':
          let formData = this.localStorage.retrieve('vmssData' + component.id);
          if (formData) {
            formData.id= component.id,
          formData.user = this.currentUser?.id;
          architecture.vmsses.push(formData);
        }
          break;
            }
    }
    if (this.architectureId) {
      this.architectureService.updateArchitecture(this.architectureId, architecture).subscribe(response => {
        console.log('Architecture updated successfully:', response);
        this.refreshArchitecture(response.id);
      }, error => {
        console.error('Error updating architecture:', error);
      });
    } else  {
      this.architectureService.createArchitecture(architecture).subscribe(response => {
        console.log('Architecture created successfully:', response);
        this.architectureId = response.id;
        this.refreshArchitecture(response.id);
      }, error => {
        console.error('Error creating architecture:', error);
      });
    }
  }

  refreshArchitecture(id: string) {
    this.architectureService.getArchitecture(id).subscribe(architecture => {
      this.generatePulumiCode(architecture);
      this.generateTerraformCode(architecture);
    });
  }
 
generatePulumiCode(architecture: any) {
  this.architectureService.generatePulumiCode(architecture).subscribe(pulumiCode => {
    this.pulumiCode = pulumiCode;
    console.log(pulumiCode);
  });
}
generateTerraformCode(architecture: any) {
  this.architectureService.generateTerraformCode(architecture).subscribe(terraformCode => {
    this.terraformCode = terraformCode;
    console.log(terraformCode);
  });
}
estimateCosts() {
  const body = {
      terraformCode: this.terraformCode
  };
  this.http.post('http://localhost:8093/api/architectures/estimateCost', body, { responseType: 'text' })
      .subscribe(response => {
          this.costEstimation = response;
      }, error => {
          console.error('Erreur lors de l\'estimation des coûts', error);
      });
}


}


