import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private SERVER_URL =  environment.apiUrl + 'api/v1/task';
  constructor(private router: Router, private http: HttpClient) {}

  getAllTasks() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL, { headers });
  }
}
