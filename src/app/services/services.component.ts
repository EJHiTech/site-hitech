import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {
      number: '01',
      title: 'Sites e Sistemas Web',
      description: 'Construímos e mantemos sites e sistemas web sob medida, modernos, responsivos e com suporte contínuo para acompanhar o crescimento do seu negócio.',
      flipped: false
    },
    {
      number: '02',
      title: 'Sistemas Legados',
      description: 'Melhoramos e damos manutenção em sistemas antigos, corrigindo falhas e modernizando o que já existe sem parar a sua operação.',
      flipped: false
    },
    {
      number: '03',
      title: 'E-mail, Domínio e Hospedagem',
      description: 'Configuramos e mantemos e-mail corporativo, domínio e hospedagem, deixando a base digital da sua empresa no ar e monitorada.',
      flipped: false
    },
    {
      number: '04',
      title: 'Aplicativos Mobile',
      description: 'Desenvolvemos e evoluímos aplicativos mobile, do protótipo à publicação, com foco em usabilidade e desempenho.',
      flipped: false
    },
    {
      number: '05',
      title: 'Coleta e Análise de Dados',
      description: 'Coletamos, organizamos e analisamos os dados do seu negócio, transformando informação dispersa em decisões embasadas.',
      flipped: false
    },
    {
      number: '06',
      title: 'Sistemas de Autoatendimento',
      description: 'Criamos sistemas de autoatendimento que reduzem filas e trabalho manual, dando autonomia e agilidade para o seu cliente.',
      flipped: false
    },
    {
      number: '07',
      title: 'Automações',
      description: 'Automatizamos tarefas repetitivas com integrações, APIs e bots, reduzindo trabalho manual e ganhando eficiência.',
      flipped: false
    },
    {
      number: '08',
      title: 'E-commerce',
      description: 'Construímos e evoluímos lojas virtuais completas, com catálogo, pagamento e gestão de pedidos integrados.',
      flipped: false
    }
  ];
}
