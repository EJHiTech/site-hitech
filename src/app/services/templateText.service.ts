import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class templateTextService {
  private templateTextSubject = new BehaviorSubject<any>({}); // Comportamento inicial vazio
  templateText$ = this.templateTextSubject.asObservable(); // Expor como Observable para os componentes

  constructor(private http: HttpClient) { }

  // Método para carregar o conteúdo do JSON
  async loadtemplateText() {
    try {
      const data = await firstValueFrom(this.http.get<any>('/assets/template.json'));
      this.templateTextSubject.next(data); // Atualiza o conteúdo
    } catch (error) {
      console.error('Erro ao carregar conteúdo', error);
      this.templateTextSubject.next({}); // No caso de erro, mantemos um conteúdo vazio
    }
  }
}
