import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      seo: {
        title: 'Empresa Júnior de Tecnologia e Soluções Digitais',
        description:
          'A Hï Tech cria sites, sistemas web, aplicativos mobile e automações. Tire seu projeto do papel com uma empresa júnior de tecnologia.',
      },
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      seo: {
        title: 'Sobre Nós e Processo Seletivo',
        description:
          'Somos uma empresa júnior que cria soluções digitais enquanto forma profissionais melhores. Conheça a Hï Tech e faça parte do time.',
      },
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      seo: {
        title: 'Serviços: Sites, Sistemas Web e Automações',
        description:
          'Sites e sistemas web, sistemas legados, apps mobile, e-commerce, automações, análise de dados, autoatendimento e configuração de e-mail, domínio e hospedagem.',
      },
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contato e Briefing',
        description:
          'Envie um briefing para a Hï Tech. Conte o que sua empresa precisa e proporemos um caminho de desenvolvimento.',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
