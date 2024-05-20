import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubnetService } from '../_services/subnet.service';
import { StorageService } from '../_services/storage.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.css']
})
export class SubnetComponent implements OnInit {
  subnetForm: FormGroup;
  currentUser: any;
  virtualNetworks: any[] = [];
  @Input() component: any; 
  @Input() placedComponents: any[] = [];  
  constructor(private architectureDataService:ArchitectureDataService,private formBuilder: FormBuilder,public modalRef: MdbModalRef<SubnetComponent> ,private virtualNetworkService: VirtualNetworkService,private subnetService: SubnetService,  private storageService: StorageService, private formDataService: FormDataService,private localStorage: LocalStorageService ) {
    this.subnetForm = this.formBuilder.group({
      name: new FormControl('', Validators.required) ,
      adress: new FormControl('', Validators.required) ,
      user: new FormControl('', Validators.required) ,
      virtualNetworks: [[]]
    });
  }

  ngOnInit(): void {
    this.loadVirtualNetwork();
    this.currentUser = this.storageService.getUser(); 
    if (this.currentUser && this.currentUser.id) {
      this.subnetForm.get('user')?.setValue(this.currentUser.id);
    }
    const storedData = this.localStorage.retrieve('subnetData' + this.component.id);
    if (storedData) {
      this.subnetForm.patchValue(storedData);
    } else {
      this.subnetForm.reset();
    }
  }
  loadVirtualNetwork(): void {
    this.virtualNetworks = this.placedComponents.filter
    (component => component.type === 'Virtual Network');
  }
   
  onSubmit() {
    const formData = this.subnetForm.value;
    
try {
  // Use the component's id to store its data in local storage
  this.localStorage.store('subnetData' + this.component.id, formData);
  console.log(this.component.id, formData);
} catch (error) {
  console.error('Error storing data in local storage:', error);
}
this.modalRef.close();

}
}
