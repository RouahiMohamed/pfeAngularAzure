import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationGatewayService } from '../_services/application-gateway.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';

@Component({
  selector: 'app-application-gateway',
  templateUrl: './application-gateway.component.html',
  styleUrls: ['./application-gateway.component.css']
})
export class ApplicationGatewayComponent implements OnInit {
  applicationGatewayForm: FormGroup;
  regions: any[] = [];
  resourceGroups: any[] = [];
  virtualNetworks: any[] = [];

  constructor(private applicationGatewayService: ApplicationGatewayService, private regionService: RegionService,
    private resourceGroupService: RessourceGroupeService,
    private virtualNetworkService: VirtualNetworkService) {
  this.applicationGatewayForm = new FormGroup({
  name: new FormControl('', Validators.required),
  region: new FormControl('', Validators.required),
  resourceGroup: new FormControl('', Validators.required),
  virtualNetwork: new FormControl('', Validators.required),
  autoscaling: new FormControl(false),
  minimum_Instance_Count: new FormControl(0, [Validators.required, Validators.min(0)]),
  maximum_Instance_Count: new FormControl(1, [Validators.required, Validators.min(1)])
});
  }

  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();
    this.loadVirtualNetwork();
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }

  loadVirtualNetwork(): void {
    this.virtualNetworkService.getAllVirtualNetworks().subscribe(data => {
      this.virtualNetworks = data;
    });
  }
  
  loadResourceGroups(): void {
    this.resourceGroupService.getAllResourceGroups().subscribe(data => {
      this.resourceGroups = data;
    });
  }

  onSubmit(): void {
    if (this.applicationGatewayForm.valid) {
      this.applicationGatewayService.createApplicationGateway(
        this.applicationGatewayForm.value.name,
        this.applicationGatewayForm.value.region,
        this.applicationGatewayForm.value.resourceGroup,
        this.applicationGatewayForm.value.virtualNetwork,
        this.applicationGatewayForm.value.autoscaling,
        this.applicationGatewayForm.value.minimum_Instance_Count,
        this.applicationGatewayForm.value.maximum_Instance_Count
      ).subscribe({
        next: (result) => console.log('Application Gateway Created', result),
        error: (error) => console.error('Error creating application gateway', error)
      });
      this.applicationGatewayForm.reset();
    }
  }
}
