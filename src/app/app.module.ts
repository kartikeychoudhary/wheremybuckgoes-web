import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { NgApexchartsModule } from 'ng-apexcharts'; // Angular Data Grid Component
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AreaComponent } from './components/charts/area/area.component';
import { LineComponent } from './components/charts/line/line.component';
import { ColumnComponent } from './components/charts/column/column.component';
import { BarComponent } from './components/charts/bar/bar.component';
import { PieComponent } from './components/charts/pie/pie.component';
import { DonutComponent } from './components/charts/donut/donut.component';
import { RadialComponent } from './components/charts/radial/radial.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFormDialogComponent } from './components/transaction-form-dialog/transaction-form-dialog.component';
import { ActionButtons } from './components/action-buttons/action-buttons.component';
import { FooterComponent } from './components/footer/footer.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { FieldEditorDialogComponent } from './components/field-editor-dialog/field-editor-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BulkUploadComponent } from './pages/bulk-upload/bulk-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ThemeToggleButtonComponent,
    DashboardComponent,
    AreaComponent,
    LineComponent,
    ColumnComponent,
    BarComponent,
    PieComponent,
    DonutComponent,
    RadialComponent,
    TransactionsComponent,
    TransactionTableComponent,
    ActionButtons,
    TransactionFormDialogComponent,
    TaskTableComponent,
    FooterComponent,
    TasksComponent,
    FieldEditorDialogComponent,
    DatePickerComponent,
    BulkUploadComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DecimalPipe,
    TitleCasePipe,
    HlmInputDirective,
    BrnSelectModule,
    ReactiveFormsModule,
    AgGridAngular,
    NgApexchartsModule,
    FontAwesomeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
