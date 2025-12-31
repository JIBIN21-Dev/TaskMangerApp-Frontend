import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  title = '';
  description = '';
  dueDate = '';
  errorMessage = '';
  currentUser = '';
  filter = 'all'; // all, pending, completed
  statistics: any = null;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = localStorage.getItem('username') || 'User';
    this.loadTasks();
    this.loadStatistics();
  }

  loadTasks() {
    this.api.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.tasks || res || [];
        this.applyFilter();
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Session expired. Please login again.');
          this.logout();
        }
      }
    });
  }

  loadStatistics() {
    this.api.getStatistics().subscribe({
      next: (res: any) => {
        this.statistics = res.statistics || res;
      },
      error: (err) => console.error('Error loading statistics:', err)
    });
  }

  applyFilter() {
    if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(t => !t.isCompleted);
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.isCompleted);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  addTask() {
    if (!this.title.trim()) {
      this.errorMessage = 'Task title is required';
      return;
    }

    const newTask = {
      title: this.title,
      description: this.description || null,
      dueDate: this.dueDate || null
    };

    this.api.createTask(newTask).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.dueDate = '';
        this.errorMessage = '';
        this.loadTasks();
        this.loadStatistics();
      },
      error: (err) => {
        this.errorMessage = 'Failed to create task';
      }
    });
  }

  toggleComplete(task: any) {
    this.api.markComplete(task.id).subscribe({
      next: () => {
        this.loadTasks();
        this.loadStatistics();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.api.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
          this.loadStatistics();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goToAdmin() {
  this.router.navigate(['/admin']);
}
}