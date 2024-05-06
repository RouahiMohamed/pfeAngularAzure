import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationGatewayService } from '../_services/application-gateway.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { SubnetService } from '../_services/subnet.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';
@Component({
  selector: 'app-application-gateway',
  templateUrl: './application-gateway.component.html',
  styleUrls: ['./application-gateway.component.css']
})
export class ApplicationGatewayComponent implements OnInit {
  applicationGatewayForm: FormGroup;
  regions: any[] = [];
  resourceGroups: any[] = [];
  subnets: any[] = [];
  currentUser: any;

  constructor(private applicationGatewayService: ApplicationGatewayService, private regionService: RegionService,
    public modalRef: MdbModalRef<ApplicationGatewayComponent>,private resourceGroupService: RessourceGroupeService,
    private subnetService: SubnetService,  private storageService: StorageService ) {
  this.applicationGatewayForm = new FormGroup({
  name: new FormControl('', Validators.required),
  region: new FormControl('', Validators.required),
  resourceGroup: new FormControl('', Validators.required),
  subnet: new FormControl('', Validators.required),
  autoscaling: new FormControl(false),
  minimum_Instance_Count: new FormControl(0, [Validators.required, Validators.min(0)]),
  maximum_Instance_Count: new FormControl(1, [Validators.required, Validators.min(1)]),
  user: new FormControl('', Validators.required) 
});
  }

  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();
    this.loadSubnets();
    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.applicationGatewayForm.get('user')?.setValue(this.currentUser.id);
    }
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }

  loadSubnets(): void {
    this.subnetService.getAllSubnets().subscribe(data => {
      this.subnets = data;
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
        this.applicationGatewayForm.value.subnet,
        this.applicationGatewayForm.value.autoscaling,
        this.applicationGatewayForm.value.minimum_Instance_Count,
        this.applicationGatewayForm.value.maximum_Instance_Count,
        this.applicationGatewayForm.value.user
      ).subscribe({
        next: (result) => console.log('Application Gateway Created', result),
        error: (error) => console.error('Error creating application gateway', error)
      });
      this.modalRef.close(true);
    }
  }
}
