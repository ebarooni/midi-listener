import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import { DeviceConfiguratorComponent } from './device-configurator/device-configurator.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EventsListComponent } from './device-configurator/events-list/events-list.component';
import {EventsListPipe} from "./device-configurator/events-list/events-list.pipe";

@NgModule({
  declarations: [
    AppComponent,
    DeviceConfiguratorComponent,
    NavbarComponent,
    FooterComponent,
    EventsListComponent,
    EventsListPipe
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
