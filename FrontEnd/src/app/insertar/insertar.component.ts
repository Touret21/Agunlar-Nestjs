import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Libro } from '../models/libro.model';
import { InsertarService } from '../services/insertar.service';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent implements OnInit {

  mensajeExito: string = '';

  mensajeError: string = '';

  camposInvalidos: boolean = false;
  
  model: Libro = {
    titulo_lbr: '',
    descripcion_lbr: '',
    genero_lbr: '',
    estado_lbr: true,
  }
  
  constructor(private insertarService: InsertarService) { }

  ngOnInit() {}

  @ViewChild('form', { static: false })
  form!: FormControl;

  insertarLibro() {
    // Lógica para insertar el libro en tu base de datos utilizando el servicio
    this.insertarService.insertarLibro(this.model).subscribe(
      (response: any) => {
        this.mensajeExito = 'Libro ingresado exitosamente';
        // Limpiar campos después de insertar el libro
        this.model = {
          titulo_lbr: '',
          descripcion_lbr: '',
          genero_lbr: '',
          estado_lbr: true
        };
        // Establecer temporizador para ocultar el mensaje de éxito después de 2 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 2000);
      },
      (error: any) => {
        this.mensajeError = 'Error al insertar el libro:', error;
      }
    );
  }

}