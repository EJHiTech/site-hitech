import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class templateTextService {
  private templateTextSubject = new BehaviorSubject<any>({}); // Comportamento inicial vazio
  templateText$ = this.templateTextSubject.asObservable(); // Expor como Observable para os componentes

  constructor(private http: HttpClient) { }

  // Método para carregar o conteúdo do JSON
  loadtemplateText() {
    this.http.get<any>('/assets/template.json').subscribe(
      (data) => {
        this.templateTextSubject.next(data); // Atualiza o conteúdo
      },
      (error) => {
        console.error('Erro ao carregar conteúdo', error);
        this.templateTextSubject.next({}); // No caso de erro, mantemos um conteúdo vazio
      }
    );
  }
}
