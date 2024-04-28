import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../_services/region.service';
import { RessourceGroupeService } from '../_services/ressource-groupe.service';

@Component({
  selector: 'app-ressource-group',
  templateUrl: './ressource-group.component.html',
  styleUrls: ['./ressource-group.component.css']
})
export class RessourceGroupComponent implements OnInit {
  regions: any[] = [];
  resourceGroupForm: FormGroup;

  constructor(private regionService: RegionService, private resourceGroupService: RessourceGroupeService) {
    this.resourceGroupForm = new FormGroup({
      region: new FormControl('', Validators.required), // Mettre à jour le type de contrôle pour correspondre à l'objet complet de la région
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }

  onSubmit() {
    if (this.resourceGroupForm.valid) {
      const formValue = this.resourceGroupForm.value;
      const selectedRegion = this.regions.find(region => region.id === formValue.region); // Récupérer l'objet complet de la région
      this.resourceGroupService.createResourceGroup(selectedRegion, formValue.name).subscribe(result => {
        console.log('Resource Group Created', result);
        // Vous pouvez ajouter une redirection ou un message de succès ici
      });
    }
  }
}
