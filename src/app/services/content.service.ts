import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contentSubject = new BehaviorSubject<any>({}); // Comportamento inicial vazio
  content$ = this.contentSubject.asObservable(); // Expor como Observable para os componentes

  constructor(private http: HttpClient) { }

  // Método para carregar o conteúdo do JSON
  loadContent() {
    this.http.get<any>('/assets/template.json').subscribe(
      (data) => {
        this.contentSubject.next(data); // Atualiza o conteúdo
      },
      (error) => {
        console.error('Erro ao carregar conteúdo', error);
        this.contentSubject.next({}); // No caso de erro, mantemos um conteúdo vazio
      }
    );
  }
}
