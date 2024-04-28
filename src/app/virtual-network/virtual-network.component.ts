import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { SubnetService } from '../_services/subnet.service';

@Component({
  selector: 'app-virtual-network',
  templateUrl: './virtual-network.component.html',
  styleUrls: ['./virtual-network.component.css']
})
export class VirtualNetworkComponent implements OnInit {
  regions: any[] = [];
  resourceGroups: any[] = [];
  subnets: any[] = [];
  virtualNetworkForm: FormGroup;

  constructor(
    private regionService: RegionService,
    private resourceGroupService: RessourceGroupeService,
    private virtualNetworkService: VirtualNetworkService,
    private subnetService: SubnetService
  ) {
    this.virtualNetworkForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ipAddresses: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      subnet: new FormControl('', Validators.required),
      resourceGroup: new FormControl('', Validators.required)
      // Add other form controls as needed
    });
  }

  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();
    this.loadSubnets();
  }
  loadSubnets(): void {
    this.subnetService.getAllSubnets().subscribe(data => {
      this.subnets = data;
    });
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
        formValue.subnet,
        formValue.resourceGroup,
        formValue.region
       
      ).subscribe(result => {
        console.log('Virtual Network Created', result);
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.virtualNetworkForm.reset();
  }
}
