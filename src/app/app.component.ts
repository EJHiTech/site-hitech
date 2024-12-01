import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content.service'; // Importa o serviço de conteúdo

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'site-hitech';

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.loadContent(); // Carrega o conteúdo quando o componente é iniciado
  }
}

