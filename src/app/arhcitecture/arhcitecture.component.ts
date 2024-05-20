import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VMImageService } from '../_services/images.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { SubnetService } from '../_services/subnet.service';
import { ArchitectureService } from '../_services/architecture.service';
import { ApplicationGatewayService } from '../_services/application-gateway.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-arhcitecture',
  templateUrl: './arhcitecture.component.html',
  styleUrls: ['./arhcitecture.component.css']
})
export class ArhcitectureComponent implements OnInit {
  currentUser: any;
  architectureForm: FormGroup;
  resourceGroups: any[] = [];
  virtualNetworks: any[] = [];
  virtualMachines: any[] = [];
  subnets: any[] = [];
  applicationGateways: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private virtualMachineService: VirtualMachineService, 
    private resourceGroupService: RessourceGroupeService, 
    private architectureService: ArchitectureService,
    private virtualNetworkService: VirtualNetworkService,
    private applicationGatwayService: ApplicationGatewayService,
    private subnetService: SubnetService,  private storageService: StorageService) {
    this.architectureForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateCreation: ['', Validators.required],
      resourceGroups: [[]],
      vmsses: [[]],
      virtualMachines: [[]],
      virtualNetworks: [[]],
      applicationGateways: [[]],
      subnets: [[]],
      user: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.loadResourceGroups();
    this.loadVirtualNetwork();
    this.loadSubnets();
    this.loadVirtualMachine();
    this.loadApplicationGateway();
    this.currentUser = this.storageService.getUser(); 
    if (this.currentUser && this.currentUser.id) {
      this.architectureForm.get('user')?.setValue(this.currentUser.id);
    }
  }
  loadApplicationGateway():void{
    this.applicationGatwayService.getAllApplicationGateways().subscribe(data => {
      this.applicationGateways = data
    });
  }
  loadSubnets(): void {
    this.subnetService.getAllSubnets().subscribe(data => {
      this.subnets = data;
    });
  }

  loadVirtualNetwork(): void {
    this.virtualNetworkService.getAllVirtualNetworks().subscribe(data => {
      this.virtualNetworks = data;
    });
  }
  loadVirtualMachine(): void {
    this.virtualMachineService.getAllVirtualMachines().subscribe(data => {
      this.virtualNetworks = data;
    });
  }

  loadResourceGroups(): void {
    this.resourceGroupService.getAllResourceGroups().subscribe(data => {
      this.resourceGroups = data;
    });
  }

  onSubmit(): void {
    if (this.architectureForm.valid) {
      let architectureData = this.architectureForm.value;
      this.architectureService.createArchitecture(architectureData)
        .subscribe({
          next: (result) => console.log('Architecture created:', result),
          error: (error) => console.error('Error creating architecture:', error)
        });
      this.architectureForm.reset();
    }
  }
}
