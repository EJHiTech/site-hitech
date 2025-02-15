import { Component } from '@angular/core';
import { environment } from '../../environments/env.prod';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  whatsappNumber = environment.whatsappNumber;
  whatsappText = environment.whatsappText;
  whatsappIconPath = environment.whatsappIconPath;

  constructor() {
  }
}
