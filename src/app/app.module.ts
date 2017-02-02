import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketService } from './ticket.service';
import { BackendServiceProvider } from './backend.service';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TicketService,
    BaseRequestOptions,
    MockBackend,
    BackendServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
