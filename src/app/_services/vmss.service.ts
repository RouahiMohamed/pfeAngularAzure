import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Assurez-vous d'importer correctement le modèle Vmss

const API_URL = 'http://localhost:8093/api/vmss/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VmssService {

  constructor(private http: HttpClient) { }

  createVmss(virtualMachine: any, name: string, nb_vm:Number): Observable<any> {
    return this.http.post(API_URL + 'addVmss', { virtualMachine, name , nb_vm}, httpOptions);
  }

  getVmssById(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'getById/' + id, httpOptions);
  }

  getAllVmss(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAll', httpOptions);
  }

  deleteVmssById(id: string): Observable<void> {
    return this.http.delete<void>(API_URL + 'deleteVmss/' + id, httpOptions);
  }

  // Ajoutez d'autres méthodes au besoin
}
