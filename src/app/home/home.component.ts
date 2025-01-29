import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublishTaskService } from 'shared/publish-task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { templateTextService } from '@app/services/templateText.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  templateText: any = {}
  texts: string[] = []; // Textos para o efeito de digitação
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private publishTaskService: PublishTaskService,
    private templateTextService: templateTextService
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.startTypingEffect();

    // Se inscreve no conteúdo compartilhado pelo serviço
    this.templateTextService.templateText$.subscribe((data) => {
    this.templateText = data.home || {}; // Acessa o conteúdo específico para a página 'home'
    this.texts = this.templateText.typingTexts || []; // Carrega os textos de digitação
    this.startTypingEffect(); // Inicia o efeito de digitação após carregar os textos
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            this.smoothScroll(element);
          }
        }
      }
    });

    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      phone: [null],
      city: [null],
      description: [null],
    });
  }

  smoothScroll(target: HTMLElement) {
    const duration = 1000; // duração de 1000ms ou 1 segundo
    const offset = 150; // Defina o deslocamento de 250 pixels
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animationScroll(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animationScroll);
    }

    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animationScroll);
  }

  startTypingEffect(): void {
    const typedText = document.getElementById('typed-text');
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (!typedText || this.texts.length === 0) return;

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typedText.textContent = this.texts[index]?.substring(0, charIndex) || '';

      if (!isDeleting && charIndex === this.texts[index].length) {
        setTimeout(() => (isDeleting = true), 1000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % this.texts.length;
      }

      setTimeout(type, isDeleting ? 50 : 100);
    };

    type();
  }

  publishTask() {
    const form = this.form.value;

    const payload = {
      name: `NOVO CONTATO - ${form.name}`,
      priority: 2,
      // description: `EMAIL: ${form.email},\n CELULAR: ${form.phone},\n CIDADE:${form.city},\n DESCRIÇÃO:${form.description}`,
      markdown_description: `EMAIL: ${form.email},\n CELULAR: ${form.phone},\n DESCRIÇÃO: ${form.description}`,
    };


    this.publishTaskService
      .publishTask(payload)
      .subscribe((res) => console.log(res));
  }
}
