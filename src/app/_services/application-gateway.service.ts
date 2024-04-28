import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8093/api/applicationGateways/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationGatewayService {

  constructor(private http: HttpClient) { }

  createApplicationGateway(name :String, region:any, resourceGroupe:any, virtualNetwork:any,
    autoscaling: boolean,
    minimum_Instance_Count: Number,
     maximum_Instance_Count: Number): Observable<any> {
    return this.http.post(API_URL + 'add',{name, region,resourceGroupe,virtualNetwork,
      autoscaling,minimum_Instance_Count,maximum_Instance_Count} , httpOptions);
  }

  getApplicationGateway(id: string): Observable<any> {
    return this.http.get(API_URL + 'get/' + id, httpOptions);
  }

  getAllApplicationGateways(): Observable<any> {
    return this.http.get(API_URL + 'getAll', httpOptions);
  }

  deleteApplicationGateway(id: string): Observable<any> {
    return this.http.delete(API_URL + '/' + id, httpOptions);
  }

  // Additional methods to interact with the API can be added here
}
