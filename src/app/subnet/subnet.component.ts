import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubnetService } from '../_services/subnet.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.css']
})
export class SubnetComponent implements OnInit {
  subnetForm: FormGroup;
  currentUser: any;

  constructor(private subnetService: SubnetService,  private storageService: StorageService) {
    this.subnetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
  }
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.subnetForm.get('user')?.setValue(this.currentUser.id);
    }
  }
  onSubmit(): void {
    if (this.subnetForm.valid) {
      const formValue = this.subnetForm.value;
      console.log(formValue);
      // Pass all three required arguments to createSubnet method
      this.subnetService.createSubnet(formValue.name, formValue.address, formValue.user).subscribe(result => {
        console.log('Subnet Created', result);
        this.subnetForm.reset(); // Reset the form after successful submission
      });
    }
  }
}
