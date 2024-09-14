import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {
  constructor(private router: Router) {}

  navigateToSection(route: string, fragment: string) {
    this.router.navigate([route], { fragment: fragment });
  }
}
