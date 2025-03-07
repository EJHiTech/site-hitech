import { Component, OnInit } from '@angular/core';
import { templateTextService } from '../services/templateText.service';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent implements OnInit {
  templateText: any = {};

  constructor(private templateTextService: templateTextService) {}

  ngOnInit() {
    this.templateTextService.templateText$.subscribe(data => {
      this.templateText = data;
    });
  }
}
