import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PublishTaskService } from 'shared/publish-task.service';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { templateTextService } from '@app/services/templateText.service';
import { ToastrService } from 'ngx-toastr';

// Estas interfaces remetem aos tipos de preenchimento da seção de clientes e parceiros no template.json
interface CompanyServices {
  title: string;
  description: string;
}
interface CostumersAndPartners {
  img: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  templateText: any = {};
  texts: string[] = []; // Textos para o efeito de digitação
  services: CompanyServices[] = [];
  costumers: CostumersAndPartners[] = [];
  partners: CostumersAndPartners[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private publishTaskService: PublishTaskService,
    private templateTextService: templateTextService,
    private toastr: ToastrService
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.templateTextService.templateText$.subscribe((data) => {
      this.templateText = data.home;
      this.texts = this.templateText.typingTexts;
      this.services = this.templateText.Services.list;
      this.costumers = this.templateText.Costumers.list;
      this.partners = this.templateText.Partners.list;
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
    const offset = 150; // Defina o deslocamento de 150 pixels
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
    this.publishTaskService.publishTask(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(
          'Seu formulário foi enviado com sucesso! 🎉',
          'Sucesso!'
        );
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Ops! Algo deu errado. Tente novamente.', 'Erro!');
      },
    });
    this.form.reset();
  }

  ngAfterViewInit() : void {
    const grid = document.querySelector<HTMLDivElement>(".grid");
    const tile = document.querySelector<HTMLDivElement>(".tile");
    if(!grid || !tile)
      return;

    const totalTiles = 50 * 50;

    const fragment = document.createDocumentFragment();
    for(let i = 0; i < totalTiles; i++) {
      const newTile = tile.cloneNode();
      fragment.appendChild(newTile);
    }

    grid.appendChild(fragment);
  }
}

