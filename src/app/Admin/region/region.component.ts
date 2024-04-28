import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { RegionService } from '../../_services/region.service';
import { AddRegionComponent } from '../add-region/add-region.component';
import { UpdateRegionComponent } from '../update-region/update-region.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],

})
export class RegionComponent implements OnInit {
  regions: any[] = [];
  pagedRegions: any[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  regionFilter: string = ''; // Filter input
  visible: boolean = false;
modalRef: MdbModalRef<AddRegionComponent> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private dialog: MatDialog, private modalService: MdbModalService, private regionService: RegionService) { }

  ngOnInit(): void {
    this.fetchRegions();
  }

  fetchRegions(): void {
    this.regionService.getAllRegions().subscribe({
      next: (data) => {
        this.regions = data;
        this.applyFilter();
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching regions', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.applyFilter();
  }

  applyFilter(): void {
    this.pagedRegions = this.regions
      .filter(region => region.displayName.toLowerCase().includes(this.regionFilter.toLowerCase()))
      .slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

 openUpdateRegionDialog(region: any): void {
    const dialogRef = this.dialog.open(UpdateRegionComponent, {
      width: '500px', // ajustez la largeur selon vos besoins
      data: { region } // passez la région sélectionnée à la boîte de dialogue de mise à jour
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // Si la boîte de dialogue a été fermée avec un résultat, actualisez la liste des régions
        this.fetchRegions();
      }
    });
  }

  openAddRegionDialog(): void {
   
   this.modalRef = this.modalService.open(AddRegionComponent); 
   this.modalRef.onClose.subscribe(() => {
      this.fetchRegions();
    });
  }


  deleteRegion(id: string): void {
    if (confirm('Are you sure you want to delete this region?')) {
      this.regionService.deleteRegion(id).subscribe({
        next: () => {
          console.log('Region deleted successfully!');
          this.fetchRegions(); // Refresh region list after deletion
        },
        error: (error) => {
          console.error('Error deleting region', error);
        }
      });
    }
  }

  
}
