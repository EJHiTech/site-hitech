import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class templateTextService {
  private templateTextSubject = new BehaviorSubject<any>({}); // Comportamento inicial vazio
  templateText$ = this.templateTextSubject.asObservable(); // Expor como Observable para os componentes

  constructor(private http: HttpClient) { }

  loadtemplateText(): Observable<any> {
    return this.http.get<any>('assets/template.json').pipe(
      tap((data) => this.templateTextSubject.next(data)), // Atualiza o estado
      catchError((error) => {
        console.error('Erro ao carregar conteúdo', error);
        this.templateTextSubject.next({});
        return of({});
      })
    );
  }
}
