import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.loginService.login(username, password)
        .subscribe(
          isValid => {
            if (isValid) {
              // Inicio de sesión exitoso
              this.router.navigate(['/inicio']); // Redireccionar al componente de inicio
            } else {
              // Usuario o contraseña incorrectos
              this.mensajeError = 'Usuario o contraseña incorrectos';
              this.loginForm.reset();
            }
          },
          error => {
            // Error en el inicio de sesión
            this.mensajeError = 'Error en el inicio de sesión';
          }
        );
    }
  }
}