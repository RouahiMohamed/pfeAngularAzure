import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVirtualNetworkDialogComponent } from './add-virtual-network-dialog.component';

describe('AddVirtualNetworkDialogComponent', () => {
  let component: AddVirtualNetworkDialogComponent;
  let fixture: ComponentFixture<AddVirtualNetworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVirtualNetworkDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVirtualNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
