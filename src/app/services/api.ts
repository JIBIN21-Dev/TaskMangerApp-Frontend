import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {




  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl + '/api';
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  // REGISTER
  register(data: any) {
    return this.http.post(`${this.baseUrl}/Values/register`, data);
  }

  // LOGIN
  login(data: any) {
    return this.http.post(`${this.baseUrl}/Values/login`, data);
  }

  // TASKS
  getTasks() {
    return this.http.get(`${this.baseUrl}/Tasks`, this.getHeaders());
  }

  createTask(task: any) {
    return this.http.post(`${this.baseUrl}/Tasks`, task, this.getHeaders());
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/Tasks/${id}`, this.getHeaders());
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.baseUrl}/Tasks/${id}`, task, this.getHeaders());
  }

  markComplete(id: number) {
    return this.http.patch(`${this.baseUrl}/Tasks/${id}/complete`, {}, this.getHeaders());
  }

  getStatistics() {
    return this.http.get(`${this.baseUrl}/Tasks/statistics`, this.getHeaders());
  }

  // ADMIN
  getAdminStatistics() {
    return this.http.get(`${this.baseUrl}/Admin/statistics`, this.getHeaders());
  }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/Admin/users`, this.getHeaders());
  }
}
