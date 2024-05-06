import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { StorageService } from '../_services/storage.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-virtual-network',
  templateUrl: './virtual-network.component.html',
  styleUrls: ['./virtual-network.component.css']
})
export class VirtualNetworkComponent implements OnInit {
  regions: any[] = [];
  resourceGroups: any[] = [];
  currentUser: any;
  virtualNetworkForm: FormGroup;

  constructor(
    private regionService: RegionService,
    private resourceGroupService: RessourceGroupeService,
    private virtualNetworkService: VirtualNetworkService,
   private storageService: StorageService, public modalRef: MdbModalRef<VirtualNetworkComponent>
  ) {
    this.virtualNetworkForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ipAddresses: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      resourceGroup: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
      
    });
  }

  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();

    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.virtualNetworkForm.get('user')?.setValue(this.currentUser.id);
    }
  }
 
  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }
  
  loadResourceGroups(): void {
    this.resourceGroupService.getAllResourceGroups().subscribe(data => {
      this.resourceGroups = data;
    });
  }
  


  onSubmit(): void {
    if (this.virtualNetworkForm.valid) {
      const formValue = this.virtualNetworkForm.value;
      this.virtualNetworkService.createVirtualNetwork(
        formValue.name,
        formValue.ipAddresses,
        formValue.resourceGroup,
        formValue.region,
        formValue.user
       
      ).subscribe(result => {
        console.log('Virtual Network Created', result);
        this.modalRef.close(true);
      });
    }
  }

}
