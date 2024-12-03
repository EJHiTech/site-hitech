import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  content: any = {}

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    // Se inscreve no conteúdo compartilhado pelo serviço
    this.contentService.content$.subscribe((data) => {
      this.content = data.footer ||{}; // Acessa o conteúdo específico para a página 'home'
      });
  }
}