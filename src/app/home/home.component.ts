import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    const typedText = document.getElementById('typed-text');
    const texts = ["Bem-vindo à HÏ TECH", "Inovação e Sucesso", "Sua Solução Ideal"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const type = () => {
      if (!typedText) return;

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typedText.textContent = texts[index].substring(0, charIndex);
      
      if (!isDeleting && charIndex === texts[index].length) {
        setTimeout(() => isDeleting = true, 1000); // Pausa ao fim da digitação completa
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length; // Muda para a próxima frase
      }

      setTimeout(type, isDeleting ? 50 : 100); // Velocidade de exclusão e digitação
    };

    type();
  }
}
