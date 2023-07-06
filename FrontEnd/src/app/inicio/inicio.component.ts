import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro.model';
import { InicioService } from '../services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  librosDisponibles: Libro[] = [];

  constructor(private inicioService: InicioService) {

  }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros(): void {
    this.inicioService.getLibros().subscribe((libro) => {
      console.log(libro);
      
      this.librosDisponibles = libro
    });
  }
}
