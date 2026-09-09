import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { templateTextService } from '@app/services/templateText.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Estas interfaces remetem aos tipos de preenchimento da seção de clientes e parceiros no template.json
interface CompanyServices {
  title: string;
  subtitle: string;
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
export class HomeComponent implements OnInit {
  templateText: any = {};
  isLoading = false;
  texts: string[] = []; // Textos para o efeito de digitação
  services: CompanyServices[] = [];
  costumers: CostumersAndPartners[] = [];
  partners: CostumersAndPartners[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private templateTextService: templateTextService,
    private toastr: ToastrService
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.templateTextService.templateText$.subscribe((data) => {
      this.templateText = data.home;
      this.services = this.templateText.Services.list;
      this.costumers = this.templateText.Costumers.list;
      this.partners = this.templateText.Partners.list;
    });

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  private apiUrl = "https://script.google.com/macros/s/AKfycbwSrUCO9dx6bTOBEjaUHYMgQ0i6nblIku5bquQoOYDmioYzmjCd1PNG_Io__eYXsn-i7Q/exec";
  
  async publishTask() {
  console.log('CLIQUE NO ENVIAR');

  if (this.form.invalid) {
    console.log('FORM INVÁLIDO', this.form.value);
    this.form.markAllAsTouched();
    return;
  }

  console.log('FORM VÁLIDO', this.form.value);

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

    console.log('POST enviado');

    this.toastr.success('Mensagem enviada com sucesso!');
    this.form.reset();

  } catch (error) {
    console.error('ERRO NO POST:', error);
    this.toastr.error('Erro ao enviar mensagem.');

  } finally {
    this.isLoading = false;
  }
}
}
