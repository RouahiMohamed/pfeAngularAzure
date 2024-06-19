import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-terraform-code-dialog',
  templateUrl: './terraform-code-dialog.component.html',
  styleUrl: './terraform-code-dialog.component.css'
})
export class TerraformCodeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { terraformCode: string },public modalRef: MdbModalRef<TerraformCodeDialogComponent>) { }

  onClose(): void {
  }
}
