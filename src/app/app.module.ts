import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { Page0Component } from './page0/page0.component';
import { Page1Component } from './page1/page1.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { TableWithInputComponent } from './table-with-input/table-with-input.component';
import { CommonModule } from '@angular/common';
import { ChartWithInputComponent } from './chart-with-input/chart-with-input.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ValidItemsPipe } from './valid-items.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    Page0Component,
    Page1Component,
    TableWithInputComponent,
    ChartWithInputComponent,
    ValidItemsPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
