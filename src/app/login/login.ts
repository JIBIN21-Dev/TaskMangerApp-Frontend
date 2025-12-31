import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    // If already logged in, redirect to tasks
    if (localStorage.getItem('token')) {
      this.router.navigate(['/tasks']);
    }
  }

  login() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.isLoading = true;

    this.api.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // Save token
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('username', res.username);
        
        // Navigate to tasks
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid username or password';
        console.error('Login error:', err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}