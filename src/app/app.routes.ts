import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./home/home').then(m => m.HomeComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./register/register').then(m => m.RegisterComponent)
  },
  { 
    path: 'tasks', 
    loadComponent: () => import('./tasks/tasks').then(m => m.TasksComponent)
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin').then(m => m.AdminComponent)
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];