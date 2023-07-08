import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModificarService {
  apiUrl: string = "http://localhost:3000/libro/";

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  modificarLibro(libro: Libro): Observable<any> {
    const url = `${this.apiUrl}${libro.id_lbr}`;
    return this.http.put(url, libro);
  }

  eliminarLibro(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url);
  }
}
