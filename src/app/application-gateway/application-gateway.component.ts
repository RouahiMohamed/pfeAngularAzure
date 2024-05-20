import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationGatewayService } from '../_services/application-gateway.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { SubnetService } from '../_services/subnet.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';
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
  @Input() component: any; 
  @Input() placedComponents: any[] = []; 
  constructor(private regionService: RegionService,
    public modalRef: MdbModalRef<ApplicationGatewayComponent>,private formDataService: FormDataService,
    private storageService: StorageService ,private localStorage: LocalStorageService) {
  this.applicationGatewayForm = new FormGroup({
  name: new FormControl('', Validators.required),
  region: new FormControl('', Validators.required),
  resourceGroupe: new FormControl('', Validators.required),
  subnet: new FormControl('', Validators.required),
  autoscaling: new FormControl(false),
  minimum_Instance_Count: new FormControl(0, [Validators.required, Validators.min(0)]),
  maximum_Instance_Count: new FormControl(1, [Validators.required, Validators.min(1)]),
  user: new FormControl('', Validators.required) 
});
  }

  ngOnInit(): void {
   
    this.loadResourceGroups();
    this.loadSubnets();
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
    this.currentUser = this.storageService.getUser(); 
    if (this.currentUser && this.currentUser.id) {
      this.applicationGatewayForm.get('user')?.setValue(this.currentUser.id);
    }
    const storedData = this.localStorage.retrieve('applicationGatewayData' + this.component.id);
    if (storedData) {
      this.applicationGatewayForm.patchValue(storedData);
    } else {
      this.applicationGatewayForm.reset();
    }
  
  }

   loadSubnets(): void {
    this.subnets = this.placedComponents.filter
    (component => component.type === 'Subnet');
    console.log(this.subnets);
  }
  
  loadResourceGroups(): void {
    this.resourceGroups = this.placedComponents.filter
    (component => component.type === 'ressourceGroup');
    console.log(this.resourceGroups);
  }
  onSubmit() {
    const formData = this.applicationGatewayForm.value;
    const subnetData = this.localStorage.retrieve('subnetData' + formData.subnet);
    formData.subnet = subnetData;
    const resourceGroupData = this.localStorage.retrieve('resourceGroupData' + formData.resourceGroupe);
    formData.resourceGroupe = resourceGroupData;
   
try {
  this.localStorage.store('applicationGatewayData' + this.component.id, formData);
  console.log(this.component.id, formData);
} catch (error) {
  console.error('Error storing data in local storage:', error);
}
this.modalRef.close();
}
  
}
