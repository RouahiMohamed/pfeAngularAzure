import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-ressource-group',
  templateUrl: './ressource-group.component.html',
  styleUrls: ['./ressource-group.component.css']
})
export class RessourceGroupComponent implements OnInit {
  regions: any[] = [];
  resourceGroupForm: FormGroup;
  currentUser: any;

  constructor(public modalRef: MdbModalRef<RessourceGroupComponent>, private regionService: RegionService, private resourceGroupService: RessourceGroupeService,  private storageService: StorageService) {
    this.resourceGroupForm = new FormGroup({
      region: new FormControl('', Validators.required), // Mettre à jour le type de contrôle pour correspondre à l'objet complet de la région
      name: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required) 
    });
  }

  ngOnInit() :void{
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
    this.currentUser = this.storageService.getUser(); // Get the logged-in user
    // Initialize the 'user' field with the ID of the logged-in user
    if (this.currentUser && this.currentUser.id) {
      this.resourceGroupForm.get('user')?.setValue(this.currentUser.id);
    }
  }

  onSubmit() {
    if (this.resourceGroupForm.valid) {
      const formValue = this.resourceGroupForm.value;
      const selectedRegion = this.regions.find(region => region.id === formValue.region); // Récupérer l'objet complet de la région
      this.resourceGroupService.createResourceGroup(selectedRegion, formValue.name, formValue.user).subscribe(result => {
        console.log('Resource Group Created', result);
        this.modalRef.close(true);
        // Vous pouvez ajouter une redirection ou un message de succès ici
      });
    }
  }
}
