import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../models/libro.model';
import { ModificarService } from '../services/modificar.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit, AfterViewInit {

  constructor(private modificarService: ModificarService, private formBuilder: FormBuilder) { }

  @ViewChild('form', { static: false })
  form!: FormControl;

  @ViewChild('filtro', { static: false })
  filtro!: FormControl;
  private _textoFiltro: string = '';

  set textoFiltro(t: string) {
    console.log('textoFiltro', t);
    this._textoFiltro = t;
    // filtrar los cursos
    this.filtrarCursos(t);
    // this.cursos = t? this.filtrarCursos(t): this.cursosServices.getCourses();
  }

  get textoFiltro() {
    return this._textoFiltro;
  }

  mensajeExito: string = '';
  camposInvalidos: boolean = false;
  libros!: Libro[];
  cursosFiltrados!: Libro[];
  mensajeError!: string;
  formulario!: FormGroup;
  id_encontrado: number | undefined;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getLibros()

    this.formulario = this.formBuilder.group({
      titulo_lbr: [''],
      genero_lbr: [''],
      descripcion_lbr: ['']
    });
  }

  getLibros(): void {
    this.modificarService.getLibros().subscribe((libro) => {
      this.libros = libro;
    });
  }

  filtrarCursos(texto: string) {
    this.cursosFiltrados = this.libros.filter(
      (libro: Libro) => libro.titulo_lbr.toLowerCase().indexOf(texto.toLowerCase()) >= 0
    );

    if (texto === '') {
      // Si el texto de filtro está vacío, limpiar los campos del formulario
      this.formulario.reset();
    } else if (this.cursosFiltrados.length > 0) {
      // Si se encontraron libros que coinciden con el filtro, mostrar los datos en el formulario
      const libroEncontrado = this.cursosFiltrados[0]; // Suponiendo que solo se mostrará el primer libro encontrado
      this.formulario.patchValue({
        titulo_lbr: libroEncontrado.titulo_lbr,
        genero_lbr: libroEncontrado.genero_lbr,
        descripcion_lbr: libroEncontrado.descripcion_lbr
      });
      this.id_encontrado = libroEncontrado.id_lbr;
    } else {
      // Si no se encontraron libros que coincidan con el filtro, limpiar los campos del formulario
      this.formulario.reset();
    }
  }

  modificarLibro() {
    const libroModificado = {
      ...this.formulario.value,
      id_lbr: this.id_encontrado
    };
    // Lógica para modificar el libro en tu base de datos utilizando el servicio
    this.modificarService.modificarLibro(libroModificado).subscribe(
      (response: any) => {
        console.log(response);
        this.mensajeExito = 'Libro modificado exitosamente';
        this.formulario.reset(); // Vaciar los campos del formulario
        
        setTimeout(() => {
          this.mensajeExito = '';
        }, 2000);
      },
      (error: any) => {
        this.mensajeError = 'Error al modificar el libro', error;
      }
    );
  }

  eliminarLibro() {
    if (this.id_encontrado) {
      // Lógica para eliminar el libro de tu base de datos utilizando el servicio
      this.modificarService.eliminarLibro(this.id_encontrado).subscribe(
        (response: any) => {
          console.log(response);
          this.mensajeExito = 'Libro eliminado exitosamente';
          this.formulario.reset(); // Vaciar los campos del formulario
          
          setTimeout(() => {
            this.mensajeExito = '';
          }, 2000);
        },
        (error: any) => {
          this.mensajeError = 'Error al eliminar el libro', error;
        }
      );
    } else {
      // No se ha seleccionado ningún libro para eliminar
      this.mensajeError = 'Error: No se ha seleccionado ningún libro para eliminar.';
    }
  }

}
