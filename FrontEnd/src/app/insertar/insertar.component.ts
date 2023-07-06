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

  contador: number | undefined;

  mensajeExito: string = '';

  mensajeError: string = '';

  camposInvalidos: boolean = false;
  
  model: Libro = {
    id_lbr: 0,
    titulo_lbr: '',
    descripcion_lbr: '',
    genero_lbr: '',
    estado_lbr: true,
  }
  
  constructor(private insertarService: InsertarService) { }

  ngOnInit() {
    // Obtener el último ID desde tu servicio o API
    this.insertarService.obtenerUltimoId().subscribe(
      (ultimoId: number) => {
        // Asignar el último ID a la variable contador
        this.contador = ultimoId;
        // Incrementar el contador en 1 para el próximo ID
        this.contador++;
        // Asignar el valor del contador al ID del modelo
        this.model.id_lbr = this.contador;
      },
      (error: any) => {
        console.error('Error al obtener el último ID:', error);
      }
    );
  }

  @ViewChild('form', { static: false })
  form!: FormControl;

  insertarLibro() {
    // Lógica para insertar el libro en tu base de datos utilizando el servicio
    this.insertarService.insertarLibro(this.model).subscribe(
      (response: any) => {
        this.mensajeExito = 'Libro ingresado exitosamente';
        // Limpiar campos después de insertar el libro
        this.model = {
          id_lbr: 0,
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