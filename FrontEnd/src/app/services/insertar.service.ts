import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class InsertarService {
  apiUrl: string = "http://localhost:3000/libro/";

  constructor(private http: HttpClient) { }

  insertarLibro(libro: Libro): Observable<any> {
    return this.http.post(this.apiUrl, libro);
  }
  
  obtenerUltimoId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?_sort=id_lbr&_order=desc&_limit=1`);
  }

}
