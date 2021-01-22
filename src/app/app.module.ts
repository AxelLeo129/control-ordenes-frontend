import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Personalización
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { ToastMessagesComponent } from './components/toast-messages/toast-messages.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginRegisterComponent } from './pages/auth/login-register/login-register.component';
import { ReportsComponent } from './pages/products/reports/reports.component';
import { CheckoutComponent } from './pages/products/checkout/checkout.component';
import { ComponentMenuComponent } from './components/component-menu/component-menu.component';
import { interceptorProvider } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    ModalProductComponent,
    ToastMessagesComponent,
    LoginRegisterComponent,
    ReportsComponent,
    CheckoutComponent,
    ComponentMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
