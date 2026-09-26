import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoData {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'Hï Tech';
  private readonly baseUrl = 'https://hitech.org.br';

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  update(data: SeoData): void {
    const fullTitle = `${data.title} | ${this.siteName}`;
    const url = this.canonicalUrl();

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });

    this.setCanonical(url);
  }

  /**
   * URL absoluta da rota atual, sem query string nem fragmento.
   * '/' e '/home' servem a mesma pagina, entao as duas apontam para a raiz:
   * assim o Google consolida o sinal num endereco so em vez de tratar as
   * duas como conteudo duplicado.
   */
  private canonicalUrl(): string {
    const path = this.router.url.split(/[?#]/)[0];

    if (path === '/' || path === '/home') {
      return `${this.baseUrl}/`;
    }
    return `${this.baseUrl}${path}`;
  }

  /**
   * O <link rel="canonical"> do index.html e fixo na home. Sem atualizar por
   * rota, toda pagina se declara copia da home e sai do indice.
   * Via DOCUMENT para funcionar tambem na pre-renderizacao no servidor.
   */
  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
