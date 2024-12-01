import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { CoreComponent } from './core/core.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublishTaskService } from 'shared/publish-task.service';
import { HttpClientModule } from '@angular/common/http';
import { ContentService } from './services/content.service';  // Importando o ContentService

@NgModule({
  declarations: [
    CoreComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,  // Não precisa do CommonModule, já está incluso no BrowserModule
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,  // Módulo para fazer requisições HTTP
  ],
  providers: [
    PublishTaskService,
    ContentService,  // Adicionando o ContentService aos provedores
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
