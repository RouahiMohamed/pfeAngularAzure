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
import { DraganddropComponent } from './draganddrop/draganddrop.component';
import { CanvasComponent } from './canvas/canvas.component';
import { DragDroppppComponent } from './drag-dropppp/drag-dropppp.component';
import { DragOOOOComponent } from './drag-oooo/drag-oooo.component';
import { DragdedeComponent } from './dragdede/dragdede.component';
import { DragDropCanvasssssComponent } from './drag-drop-canvasssss/drag-drop-canvasssss.component';
import { DragDropeyaaaComponent } from './drag-dropeyaaa/drag-dropeyaaa.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent ,
  children: [
     { path: 'profile', component: ProfileComponent },
     { path: 'architecture', component: ArhcitectureComponent },
     { path: 'regionet', component: RegionComponent },
     { path: 'disks', component: DiskComponent },
     { path: 'subnet', component: SubnetComponent },
     { path: 'os', component: OsMachineComponent },
     { path: 'vm', component: VirtualMachineComponent },
     { path: 'dashbord', component: DashbordComponent }]},
  { path: 'landing', component: LandingpageComponent },
  { path: 'disks', component: DiskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regionet', component: RegionComponent },
  { path: 'drag', component: DraganddropComponent },
  { path: 'dragdrop', component: DragDroppppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'os', component: OsMachineComponent },
  { path: 'forgot', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'ressource', component: RessourceGroupComponent },
  { path: 'subnet', component: SubnetComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'virtualNetwork', component: VirtualNetworkComponent },
  { path: 'applicationGateway', component: ApplicationGatewayComponent },
  { path: 'vm', component: VirtualMachineComponent },
  { path: 'vmss', component: VmssComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'dra', component: DragOOOOComponent },
  { path: 'draww', component: DragdedeComponent },
  { path: 'abdou', component: SidebarComponent },
  { path: 'eya', component: DragDropeyaaaComponent },
  { path: 'tajrba', component: DragDropCanvasssssComponent },
  { path: 'architecture', component: ArhcitectureComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }