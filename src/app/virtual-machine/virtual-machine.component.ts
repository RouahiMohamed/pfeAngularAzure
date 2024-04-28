import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VirtualMachineService } from '../_services/virtual-machine.service';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { VirtualNetworkService } from '../_services/virtual-network.service';
import { DiskSizeService } from '../_services/disk-size.service';
import { VMImageService } from '../_services/images.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VirtualNetworkComponent } from '../virtual-network/virtual-network.component';
import { SubnetService } from '../_services/subnet.service';
import { AddVirtualNetworkDialogComponent } from '../add-virtual-network-dialog/add-virtual-network-dialog.component';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machine.component.html',
  styleUrls: ['./virtual-machine.component.css']
})
export class VirtualMachineComponent implements OnInit {
  virtualMachineForm: FormGroup;
  regions: any[] = [];
  images: any[] = [];
  diskSizes: any[] = [];
  resourceGroups: any[] = [];
  virtualNetworks: any[] = [];
  currentUser: any;
 
  subnets: any[] = [];

  constructor(private virtualMachineService: VirtualMachineService, private regionService: RegionService, private diskService: DiskSizeService,
    private resourceGroupService: RessourceGroupeService, private imageService: VMImageService, public dialog: MatDialog,
    private virtualNetworkService: VirtualNetworkService,
    private subnetService: SubnetService, private storageService: StorageService) {
    this.virtualMachineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      idRegion: new FormControl('', Validators.required),
      idRessourceGroupe: new FormControl('', Validators.required),
      idImage: new FormControl('', Validators.required),
      idVirtualNetwork: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      idDiskSize: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
    
  }
  
  ngOnInit(): void {
    this.loadRegions();
    this.loadResourceGroups();
    this.loadVirtualNetwork();
    this.onRegionChange();
    this.loadImages();
    this.loadSubnets();

    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.virtualMachineForm.get('user')?.setValue(this.currentUser.id);
    }
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
  loadImages(): void {
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
    });
  }
  onRegionChange(): void {
    const selectedRegionId = this.virtualMachineForm.value.idRegion;
    if (selectedRegionId) {
      this.diskService.getDiskSizesByRegionId(selectedRegionId).subscribe(data => {
        this.diskSizes = data;
      });
    }
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
    if (this.virtualMachineForm.valid) {
      const formValue = this.virtualMachineForm.value;
      console.log(formValue);
      this.virtualMachineService.createVirtualMachine(
        formValue.name,
        formValue.idRegion,
        formValue.idRessourceGroupe,
        formValue.idVirtualNetwork,
        formValue.idImage,
        formValue.username,
        formValue.password,
        formValue.idDiskSize,
        formValue.user
      ).subscribe({
        next: (result) => console.log('Virtual Machine Created', result),
        error: (error) => console.error('Error creating virtual machine', error)
      });
      this.virtualMachineForm.reset();
    }
  }
  
  openVirtualNetworkDialog(): void {
    const dialogConfig = {
      width: '500px',
      // Center the dialog by overriding CSS (usually unnecessary)
      position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };
    
    const dialogRef = this.dialog.open(AddVirtualNetworkDialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the list of virtual networks after the dialog is closed
      this.loadVirtualNetwork();
    });
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddVirtualNetworkDialogComponent, dialogConfig);
  }

  
}