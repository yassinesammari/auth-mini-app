import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint = 'api/Auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  // Register a new user
  register(user: any) {
    return this.http.post(
      environment.apiURL + this.endPoint + 'register',
      user
    );
  }
  // Login user
  login(credentials: any) {
    return this.http.post(
      environment.apiURL + this.endPoint + 'login',
      credentials
    );
  }
  // Logout user
  logout() {
    return this.http.get(environment.apiURL + this.endPoint + 'logout');
  }
  // Save the JWT token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  // Get the JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Remove the JWT token
  removeToken(): void {
    localStorage.removeItem('token');
  }
  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
