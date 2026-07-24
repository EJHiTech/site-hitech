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
      phone: [null, [Validators.required, Validators.pattern(/^\d{11}$/)]],
      city: [null],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  publishTask() {}
}
