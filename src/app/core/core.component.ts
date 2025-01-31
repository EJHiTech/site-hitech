import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { templateTextService } from '@app/services/templateText.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent implements OnInit {
  templateText: any = {}
  constructor(
    private router: Router,
    private templateTextService: templateTextService,

  ) {}
  
  ngOnInit(): void {
    // Se inscreve no conteúdo compartilhado pelo serviço
    this.templateTextService.templateText$.subscribe((data) => {
    this.templateText = data.core ||{}; // Acessa o conteúdo específico para a página 'core'

});

}

  navigateToSection(route: string, fragment: string) {
    this.router.navigate([route], { fragment: fragment });
  }



}