import { Component } from '@angular/core';

@Component({
  selector: 'app-success-cases',
  templateUrl: './success-cases.component.html',
  styleUrl: './success-cases.component.scss'
})
export class SuccessCasesComponent {
  cases = [
    {
      title: 'Projeto 1',
      description: 'Descrição breve do case de sucesso.',
      tag: 'Web App'
    },
    {
      title: 'Projeto 2',
      description: 'Descrição breve do case de sucesso.',
      tag: 'Sistema'
    },
    {
      title: 'Projeto 3',
      description: 'Descrição breve do case de sucesso.',
      tag: 'Mobile'
    },
    {
      title: 'Projeto 4',
      description: 'Descrição breve do case de sucesso.',
      tag: 'Automação'
    }
  ];

  currentIndex = 0;

  get visibleCases() {
    return this.cases.slice(this.currentIndex, this.currentIndex + 3);
  }

  next() {
    if (this.currentIndex + 3 < this.cases.length) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
