import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { InsertarComponent } from './insertar/insertar.component';
import { ModificarComponent } from './modificar/modificar.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'inicio', component: InicioComponent,
  },
  {
    path: 'insertar', component: InsertarComponent,
  },
  {
    path: 'modificar', component: ModificarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
