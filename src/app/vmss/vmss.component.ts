import { Component } from '@angular/core';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VmssService } from '../_services/vmss.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-vmss',
  templateUrl: './vmss.component.html',
  styleUrl: './vmss.component.css'
})
export class VmssComponent {

  VmssForm: FormGroup;
  currentUser: any;
  virtualMachines: any[] = [];

  constructor(private storageService: StorageService, public modalRef: MdbModalRef<VmssComponent>,
    private virtualMachineervice: VirtualMachineService, private vmssService: VmssService) {
  this.VmssForm = new FormGroup({
  name: new FormControl('', Validators.required),
  nb_vm: new FormControl('', Validators.required),
  virtualMachine: new FormControl('', Validators.required),
  user: new FormControl('', Validators.required) 
});
  }
  ngOnInit(): void {
    this.loadVirtualMachine();
    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.VmssForm.get('user')?.setValue(this.currentUser.id);
    }
  }

  loadVirtualMachine(): void {
    this.virtualMachineervice.getAllVirtualMachines().subscribe(data => {
      this.virtualMachines = data;
    });
  }
  
  onSubmit(): void {
    if (this.VmssForm.valid) {
      this.vmssService.createVmss(
        this.VmssForm.value.virtualMachine,
        this.VmssForm.value.name,
        this.VmssForm.value.nb_vm,
        this.VmssForm.value.user
      ).subscribe({
        next: (result) => console.log('Vmss Created', result),
        error: (error) => console.error('Error creating Vmss', error)
      });
      this.modalRef.close(true);
    }
  }
}
