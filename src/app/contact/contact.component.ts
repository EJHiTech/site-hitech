import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  form: FormGroup;
  isLoading = false;

  private apiUrl = "https://script.google.com/macros/s/AKfycbwSrUCO9dx6bTOBEjaUHYMgQ0i6nblIku5bquQoOYDmioYzmjCd1PNG_Io__eYXsn-i7Q/exec";

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  async publishTask() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const dados = {
      name: this.form.value.name,
      email: this.form.value.email,
      description: this.form.value.description,
      date: new Date().toISOString()
    };

    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(dados)
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
}
