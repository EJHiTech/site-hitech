import { Component, OnInit } from '@angular/core';
import { templateTextService } from './services/templateText.service'; // Importa o serviço de conteúdo

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'site-hitech';
  loading = true;

  constructor(private templateTextService: templateTextService) {}

  async ngOnInit(): Promise<void> {
    await this.templateTextService.loadtemplateText(); // Carrega o conteúdo quando o componente é iniciado
    this.loading = false;
  }
}
