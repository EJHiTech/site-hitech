import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublishTaskService } from 'shared/publish-task.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private publishTaskService: PublishTaskService
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.startTypingEffect();

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
    const texts = [
      'Bem-vindo!',
      'Inovação e Sucesso',
      'Qualidade e Segurança',
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const type = () => {
      if (!typedText) return;

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typedText.textContent = texts[index].substring(0, charIndex);

      if (!isDeleting && charIndex === texts[index].length) {
        setTimeout(() => (isDeleting = true), 1000); // Pausa ao fim da digitação completa
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length; // Muda para a próxima frase
      }

      setTimeout(type, isDeleting ? 50 : 100); // Velocidade de exclusão e digitação
    };

    type();
  }

  publishTask() {
    const form = this.form.value;

    const payload = {
      name: `NOVO CONTATO - ${form.name}`,
      priority: 2,
      // description: `EMAIL: ${form.email},\n CELULAR: ${form.phone},\n CIDADE:${form.city},\n DESCRIÇÃO:${form.description}`,
      markdown_description: `EMAIL: ${form.email},\n CELULAR: ${form.phone},\n CIDADE: ${form.city},\n DESCRIÇÃO: ${form.description}`,
    };

    this.publishTaskService
      .publishTask(payload)
      .subscribe((res) => console.log(res));
  }
}
