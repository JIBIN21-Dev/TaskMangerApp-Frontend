import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  statistics: any = null;
  users: any[] = [];
  loading = true;
  currentUser = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.currentUser = localStorage.getItem('username') || '';

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // Only allow admin user
    if (this.currentUser !== 'jibin2121') { // Change to YOUR username!
      alert('Access denied! Admin only.');
      this.router.navigate(['/tasks']);
      return;
    }

    this.loadStatistics();
    this.loadUsers();
  }

  loadStatistics() {
    this.api.getAdminStatistics().subscribe({
      next: (res: any) => {
        this.statistics = res.statistics;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading admin stats:', err);
        this.loading = false;
        if (err.status === 403) {
          alert('Access denied!');
          this.router.navigate(['/tasks']);
        }
      }
    });
  }

  loadUsers() {
    this.api.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}