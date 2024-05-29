import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SubnetService } from '../_services/subnet.service';
import { StorageService } from '../_services/storage.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { FormDataService } from '../_services/form-data.service';
import { ArchitectureDataService } from '../_services/architecture-data-service.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ipv4Validator } from '../validateAdress/ipv4Validator';

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
  constructor(private formBuilder: FormBuilder,public modalRef: MdbModalRef<SubnetComponent> , private storageService: StorageService,private localStorage: LocalStorageService ) {
    this.subnetForm = this.formBuilder.group({
      name: new FormControl('', Validators.required) ,
      adress: new FormControl('', [Validators.required, this.ipValidator()]),
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
  ipValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:):((:[0-9a-fA-F]{1,4}){1,7}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):((:[0-9a-fA-F]{1,4}){1,6}|:)|(([0-9a-fA-F]{1,4}:){1,5}|:):((:[0-9a-fA-F]{1,4}){1,5}|:)|(([0-9a-fA-F]{1,4}:){1,4}|:):((:[0-9a-fA-F]{1,4}){1,4}|:)|(([0-9a-fA-F]{1,4}:){1,3}|:):((:[0-9a-fA-F]{1,4}){1,3}|:)|(([0-9a-fA-F]{1,4}:){1,2}|:):((:[0-9a-fA-F]{1,4}){1,2}|:)|([0-9a-fA-F]{1,4}:):([0-9a-fA-F]{1,4}:|:):|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

      if (ipv4Regex.test(value)) {
        return null; // Valid IPv4
      }

      if (ipv6Regex.test(value)) {
        return null; // Valid IPv6
      }

      return { invalidIp: true }; // Neither IPv4 nor IPv6
    };
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
