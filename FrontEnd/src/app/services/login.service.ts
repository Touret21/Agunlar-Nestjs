import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.username_usr === username && usuario.password_usr === password);
        return !!usuarioEncontrado;
      })
    );
  }
}
