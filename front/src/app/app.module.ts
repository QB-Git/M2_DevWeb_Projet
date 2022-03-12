import { MessageService, ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ListeComponent } from './liste/liste.component';
import { StatsComponent } from './stats/stats.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CarteComponent } from './partage/carte/carte.component';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ListeComponent,
    StatsComponent,
    AccueilComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    RatingModule,
    DropdownModule,
    CardModule,
    ScrollingModule,
    DataViewModule,
    ChipModule,
    BadgeModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    ToggleButtonModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ImageModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
