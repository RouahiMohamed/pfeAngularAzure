import { Component, OnInit } from '@angular/core';
import { ArchitectureService } from '../_services/architecture.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TerraformCodeDialogComponent } from '../terraform-code-dialog/terraform-code-dialog.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-list-archit',
  templateUrl: './list-archit.component.html',
  styleUrl: './list-archit.component.css'
})
export class ListArchitComponent implements OnInit {
  architectures: any[] = [];
  modalRef: MdbModalRef<TerraformCodeDialogComponent> | null = null;
  constructor(private modalService: MdbModalService, private architectureService: ArchitectureService) { }


  ngOnInit(): void {
    this.loadArchitectures();
  }

  loadArchitectures(): void {
    this.architectureService.getAllArchitectures().subscribe(data => {
      this.architectures = data;
    });
  }
  viewDetails(id: string): void {
    this.architectureService.getArchitecture(id).subscribe(architecture => {
      this.modalRef = this.modalService.open(TerraformCodeDialogComponent, {
        data: { terraformCode: architecture.terraformCode }
      });
    });
  }

}
