import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8093/api/architectures/';

const token = localStorage.getItem('access_token');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}` }) 
};

@Injectable({
  providedIn: 'root'
})
export class ArchitectureService {

  constructor(private http: HttpClient) { }

  createArchitecture(name: string, dateCreation: Date, resourceGroups: string[], vmsses: string[], virtualMachines: string[], virtualNetworks: string[], applicationGateways: string[], subnets: string[]): Observable<any> {
    return this.http.post(API_URL + 'add', { 
      name,
      dateCreation,
      resourceGroups,
      vmsses,
      virtualMachines,
      virtualNetworks,
      applicationGateways,
      subnets, 
      
    }, httpOptions);
  }  

  getArchitecture(id: string): Observable<any> {
    return this.http.get(API_URL + 'getById/' + id, httpOptions);
  }

  getAllArchitectures(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  deleteArchitecture(id: string): Observable<any> {
    return this.http.delete(API_URL + 'delete/' + id, httpOptions);
  }

}
