import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import templateData from '../../assets/template.json';

@Injectable({
  providedIn: 'root'
})
export class templateTextService {
  private templateTextSubject = new BehaviorSubject<any>(templateData); // Conteúdo já disponível no bundle
  templateText$ = this.templateTextSubject.asObservable(); // Expor como Observable para os componentes

  // O conteúdo é importado diretamente do bundle, então está disponível de
  // imediato — tanto no navegador quanto no prerender/SSR — sem requisição HTTP.
  async loadtemplateText() {
    this.templateTextSubject.next(templateData);
  }
}
