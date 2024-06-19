import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchitectureService } from '../_services/architecture.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit{
  
    architectures: any[] = [];
    totalVirtualMachines = 0;
    totalResourceGroups = 0;
    totalApplicationGateways = 0;
    totalVmsses = 0;
    totalVirtualNetworks = 0;
    totalSubnets = 0;
  
    constructor(private architectureService: ArchitectureService) { }
  
    ngOnInit(): void {
      this.loadArchitectures();
    }
  
    loadArchitectures(): void {
      this.architectureService.getAllArchitectures().subscribe(data => {
        this.architectures = data;
        this.calculateTotals();
      });
    }
  
    calculateTotals(): void {
      this.architectures.forEach(architecture => {
        this.totalVirtualMachines += architecture.virtualMachines.length;
        this.totalResourceGroups += architecture.resourceGroups.length;
        this.totalApplicationGateways += architecture.applicationGateways.length;
        this.totalVmsses += architecture.vmsses.length;
        this.totalVirtualNetworks += architecture.virtualNetworks.length;
        this.totalSubnets += architecture.subnets.length;
      });
    }
  }
