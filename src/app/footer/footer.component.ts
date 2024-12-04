import { Component, OnInit } from '@angular/core';
import { templateTextService } from '../services/templateText.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  templateText: any = {}

  constructor(private templateTextService: templateTextService) { }

  ngOnInit(): void {
    // Se inscreve no conteúdo compartilhado pelo serviço
    this.templateTextService.templateText$.subscribe((data) => {
      this.templateText = data.footer ||{}; // Acessa o conteúdo específico para a página 'home'
      });
  }
}