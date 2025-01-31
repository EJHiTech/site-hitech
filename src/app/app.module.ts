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
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // Necessário para o toast funcionar
    ToastrModule.forRoot({
      timeOut: 4000, // Tempo maior para ficar visível
      positionClass: 'toast-bottom-left', // Melhor posição
      preventDuplicates: true, // Evita mensagens repetidas
      progressBar: true, // Mostra barra de progresso
      progressAnimation: 'increasing', // Animação legal na barra
    }),
  ],
  providers: [PublishTaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
