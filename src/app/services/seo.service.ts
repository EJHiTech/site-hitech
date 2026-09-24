import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'Hï Tech';
  private readonly baseUrl = 'https://hitech.org.br';

  constructor(private titleService: Title, private meta: Meta) {}

  update(data: SeoData): void {
    const fullTitle = `${data.title} | ${this.siteName}`;

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
  }
}
