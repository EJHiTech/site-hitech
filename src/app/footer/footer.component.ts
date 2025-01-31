import { Component, OnInit } from '@angular/core';
import { templateTextService } from '../services/templateText.service'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  templateText: any = {}

  constructor(private templateTextService: templateTextService) { }

  ngOnInit(): void {
    this.templateTextService.templateText$.subscribe((data) => {
      this.templateText = data.footer ||{}; 
      });
  }
}