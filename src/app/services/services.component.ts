import { Component, OnInit } from '@angular/core';
import { templateTextService } from '../services/templateText.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{
  templateText: any = {};

  constructor(private templateTextService: templateTextService) {}

  ngOnInit() {
    this.templateTextService.templateText$.subscribe(data => {
      this.templateText = data.services;
    });
  }
}

