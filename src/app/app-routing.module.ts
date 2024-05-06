import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { BoardAdminComponent } from './board-admin/board-admin.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RessourceGroupComponent } from './ressource-group/ressource-group.component';
import { SubnetComponent } from './subnet/subnet.component';
import { VirtualNetworkComponent } from './virtual-network/virtual-network.component';
import { ApplicationGatewayComponent } from './application-gateway/application-gateway.component';
import { VirtualMachineComponent } from './virtual-machine/virtual-machine.component';
import { ArhcitectureComponent } from './arhcitecture/arhcitecture.component';
import { VmssComponent } from './vmss/vmss.component';
import { OsMachineComponent } from './Admin/os-machine/os-machine.component';
import { RegionComponent } from './Admin/region/region.component';
import { DiskComponent } from './Admin/disk/disk.component';

import { DragDropeyaaaComponent } from './drag-dropArchitecture/drag-dropArchitecture';
import { ArchitectureDesignComponent } from './architecture-design/architecture-design.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent ,
  children: [
     { path: 'profile', component: ProfileComponent },
     { path: 'architecture', component: ArhcitectureComponent },
     { path: 'regionet', component: RegionComponent },
     { path: 'disks', component: DiskComponent },
     { path: 'subnet', component: SubnetComponent },
     { path: 'os', component: OsMachineComponent },
     { path: 'design', component: ArchitectureDesignComponent },
     { path: 'tajrba2', component: DragDropeyaaaComponent },
     { path: 'vm', component: VirtualMachineComponent },
     { path: 'dashbord', component: DashbordComponent }]},
  { path: 'landing', component: LandingpageComponent },
  { path: 'disks', component: DiskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regionet', component: RegionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'os', component: OsMachineComponent },
  { path: 'forgot', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'ressource', component: RessourceGroupComponent },
  { path: 'subnet', component: SubnetComponent },
  { path: 'virtualNetwork', component: VirtualNetworkComponent },
  { path: 'applicationGateway', component: ApplicationGatewayComponent },
  { path: 'vm', component: VirtualMachineComponent },
  { path: 'vmss', component: VmssComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'tajrba2', component: DragDropeyaaaComponent },
  { path: 'design', component: ArchitectureDesignComponent },
  { path: 'architecture', component: ArhcitectureComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }