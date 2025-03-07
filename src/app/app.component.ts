import { Component, OnInit } from '@angular/core';
import { templateTextService } from './services/templateText.service'; // Importa o serviço de conteúdo

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'site-hitech';

  constructor(private templateTextService: templateTextService) {}

  ngOnInit(): void {
    this.templateTextService.loadtemplateText().subscribe(); // Carrega o conteúdo quando o componente é iniciado
  }
}
