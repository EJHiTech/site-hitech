import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { templateTextService } from '@app/services/templateText.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  templateText: any = {};

  @ViewChild('carousel') carousel!: ElementRef;

  eventPhotos = [
    { url: 'assets/events/foto1.jpg', title: 'Noiz' },
    { url: 'assets/events/foto2.jpg', title: 'O MEJ nem sempre é diversão' },
    { url: 'assets/events/foto3.jpg', title: 'Mas na maioria das vezes é!' },
    { url: 'assets/events/foto4.jpg', title: 'Noiz de novo' },
    { url: 'assets/events/foto5.jpg', title: 'Habemus fogo! (e carne)' },
    { url: 'assets/events/foto6.jpg', title: '"Tá me tirando?"' } 
];

  scrollCarousel(direction: number): void {
    const scrollAmount  = 640; //valor do deslocamento do carrossel
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}