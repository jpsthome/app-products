import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

const baseUrl = 'http://localhost:3333/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(baseUrl);
  }

  get(id: string): Observable<Client> {
    return this.http.get<Client>(`${baseUrl}/${id}`);
  }

  create(data: Client): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: string, data: Client): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
