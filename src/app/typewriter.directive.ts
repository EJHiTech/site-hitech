import { Directive, ElementRef, Inject, Input, OnInit, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input('appTypewriter') text = '';
  @Input() speed = 120;    // ms por caractere (mais alto = mais devagar)
  @Input() delay = 0;     // atraso extra depois que entra na tela
  @Input() cursor = true;

  private intervalId: any;
  private timeoutId: any;
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // No servidor (prerender/SSR) mostramos o texto completo, sem animação,
    // para o Google indexar o conteúdo e evitar APIs de browser.
    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', this.text);
      return;
    }

    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.timeoutId = setTimeout(() => this.type(), this.delay);
            this.observer.unobserve(this.el.nativeElement); // digita só uma vez
          }
        });
      },
      { threshold: 0.3 } // dispara quando 30% do elemento aparece na tela
    );

    this.observer.observe(this.el.nativeElement);
  }

  private type(): void {
    if (this.cursor) {
      this.renderer.addClass(this.el.nativeElement, 'typewriter-cursor');
    }
    let i = 0;
    this.intervalId = setInterval(() => {
      if (i < this.text.length) {
        this.el.nativeElement.textContent += this.text.charAt(i);
        i++;
      } else {
        clearInterval(this.intervalId);
        if (this.cursor) {
          setTimeout(() => this.renderer.removeClass(this.el.nativeElement, 'typewriter-cursor'), 1200);
        }
      }
    }, this.speed);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
    this.observer?.disconnect();
  }
}
