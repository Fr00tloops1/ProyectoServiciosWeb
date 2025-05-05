import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/Home-Page/home/home.component';
import { UserComponent } from './components/User-Page/user/user.component';
import { ModificarComponent } from './components/User-Page/modificar/modificar.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'User', component: UserComponent },
  { path: 'Modificar', component: ModificarComponent},
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
