"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
//Personalización
var animations_1 = require("@angular/platform-browser/animations");
var list_products_component_1 = require("./pages/products/list-products/list-products.component");
var material_module_1 = require("./material/material.module");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var modal_product_component_1 = require("./components/modal-product/modal-product.component");
var toast_messages_component_1 = require("./components/toast-messages/toast-messages.component");
var ngx_toastr_1 = require("ngx-toastr");
var login_register_component_1 = require("./pages/auth/login-register/login-register.component");
var reports_component_1 = require("./pages/products/reports/reports.component");
var checkout_component_1 = require("./pages/products/checkout/checkout.component");
var component_menu_component_1 = require("./components/component-menu/component-menu.component");
var interceptor_service_1 = require("./services/interceptor.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                list_products_component_1.ListProductsComponent,
                modal_product_component_1.ModalProductComponent,
                toast_messages_component_1.ToastMessagesComponent,
                login_register_component_1.LoginRegisterComponent,
                reports_component_1.ReportsComponent,
                checkout_component_1.CheckoutComponent,
                component_menu_component_1.ComponentMenuComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_module_1.MaterialModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                ngx_toastr_1.ToastrModule.forRoot()
            ],
            providers: [interceptor_service_1.interceptorProvider],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
