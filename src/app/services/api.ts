import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  

  private baseUrl = 'https://taskmangerapp-qoc7.onrender.com/api';


  constructor(private http: HttpClient) {}

  // 🔐 Helper method to get token from localStorage
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  // REGISTER (no token needed)
  register(data: any) {
    return this.http.post(`${this.baseUrl}/Values/register`, data);
  }

  // LOGIN (no token needed)
  login(data: any) {
    return this.http.post(`${this.baseUrl}/Values/login`, data);
  }

  // GET TASKS (needs token!)
  getTasks() {
    return this.http.get(`${this.baseUrl}/Tasks`, this.getHeaders());
  }

  // CREATE TASK (needs token!)
  createTask(task: any) {
    return this.http.post(`${this.baseUrl}/Tasks`, task, this.getHeaders());
  }

  // DELETE TASK (needs token!)
  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/Tasks/${id}`, this.getHeaders());
  }

  // UPDATE TASK (needs token!)
  updateTask(id: number, task: any) {
    return this.http.put(`${this.baseUrl}/Tasks/${id}`, task, this.getHeaders());
  }

  // MARK COMPLETE (needs token!)
  markComplete(id: number) {
    return this.http.patch(`${this.baseUrl}/Tasks/${id}/complete`, {}, this.getHeaders());
  }

  // GET STATISTICS (needs token!)
  getStatistics() {
    return this.http.get(`${this.baseUrl}/Tasks/statistics`, this.getHeaders());
  }
  // Admin endpoints
getAdminStatistics() {
  return this.http.get(`${this.baseUrl}/Admin/statistics`, this.getHeaders());
}

getAllUsers() {
  return this.http.get(`${this.baseUrl}/Admin/users`, this.getHeaders());
}
}