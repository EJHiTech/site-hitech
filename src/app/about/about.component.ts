import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { templateTextService } from '@app/services/templateText.service';
import { ToastrService } from 'ngx-toastr';

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

  form: FormGroup;
  isLoading = false;

  private apiUrl = "https://script.google.com/macros/s/AKfycbw7bvxnEtAzzHDI5jykNIoo2iTIT0ixBY-wJigVsAqboPD5jRc7ZOBGqfeCVVQcn9deUA/exec";

  eventPhotos = [
    { url: 'assets/events/foto1.jpg', title: 'Noiz' },
    { url: 'assets/events/foto2.jpg', title: 'O MEJ nem sempre é diversão' },
    { url: 'assets/events/foto3.jpg', title: 'Mas na maioria das vezes é!' },
    { url: 'assets/events/foto4.jpg', title: 'Noiz de novo' },
    { url: 'assets/events/foto5.jpg', title: 'Habemus fogo! (e carne)' },
    { url: 'assets/events/foto6.jpg', title: 'Palco Ouro, é noiz!' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      period: [null, Validators.required]
    });
  }

  async publishTask() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data = {
      name: this.form.value.name,
      email: this.form.value.email,
      period: this.form.value.period,
      date: new Date().toISOString()
    };

    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(data)
      });

    this.toastr.success('Mensagem enviada com sucesso!');
    this.form.reset();

    } catch (error) {
      console.error(error);
      this.toastr.error('Erro ao enviar mensagem.');

    } finally {
      this.isLoading = false;
    }
  }

  scrollCarousel(direction: number): void {
    const scrollAmount = 640;
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}