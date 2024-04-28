import { Component } from '@angular/core';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VmssService } from '../_services/vmss.service';

@Component({
  selector: 'app-vmss',
  templateUrl: './vmss.component.html',
  styleUrl: './vmss.component.css'
})
export class VmssComponent {

  VmssForm: FormGroup;
 
  virtualMachines: any[] = [];

  constructor(
    private virtualMachineervice: VirtualMachineService, private vmssService: VmssService) {
  this.VmssForm = new FormGroup({
  name: new FormControl('', Validators.required),
  nb_vm: new FormControl('', Validators.required),
  virtualMachine: new FormControl('', Validators.required),
});
  }
  ngOnInit(): void {

    this.loadVirtualMachine();
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
        this.VmssForm.value.nb_vm
      ).subscribe({
        next: (result) => console.log('Vmss Created', result),
        error: (error) => console.error('Error creating Vmss', error)
      });
      this.VmssForm.reset();
    }
  }
}
