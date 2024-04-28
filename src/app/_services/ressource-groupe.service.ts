import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8093/api/resourceGroups/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class RessourceGroupeService {

  constructor(private http: HttpClient) {}

  createResourceGroup(region: any, name: string): Observable<any> {
    return this.http.post(API_URL + 'add', { region, name }, httpOptions);
  }
  getAllResourceGroups(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllRessource');
  }
  
}