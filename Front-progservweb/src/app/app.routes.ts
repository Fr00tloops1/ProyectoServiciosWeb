import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/Home-Page/home/home.component';
import { UserComponent } from './components/User-Page/user/user.component';
import { ModificarComponent } from './components/User-Page/modificar/modificar.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'User', component: UserComponent },
  { path: 'Modificar', component: ModificarComponent },
  { path: 'Comments', component: CommentsComponent },
  { path: '**', redirectTo: '/login' }
]; 