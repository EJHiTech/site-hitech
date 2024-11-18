import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/env.prod';

@Injectable({
  providedIn: 'root',
})
export class PublishTaskService {
  private apiUrl = environment.urlSource;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  /**
   * Envia uma requisição POST para criar uma tarefa no ClickUp
   * @param payload Dados da tarefa a serem enviados
   * @returns Observable com a resposta do servidor
   */
  publishTask(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload, { headers: this.headers });
  }
}
