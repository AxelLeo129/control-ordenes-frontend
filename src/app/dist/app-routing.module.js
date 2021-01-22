"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var seller_guard_1 = require("./guards/seller.guard");
var login_register_component_1 = require("./pages/auth/login-register/login-register.component");
var checkout_component_1 = require("./pages/products/checkout/checkout.component");
var list_products_component_1 = require("./pages/products/list-products/list-products.component");
var reports_component_1 = require("./pages/products/reports/reports.component");
var routes = [{
        path: '',
        component: list_products_component_1.ListProductsComponent
    },
    {
        path: 'productos',
        component: list_products_component_1.ListProductsComponent
    },
    {
        path: 'login',
        component: login_register_component_1.LoginRegisterComponent
    },
    {
        path: 'checkout',
        component: checkout_component_1.CheckoutComponent
    },
    {
        path: 'reports',
        component: reports_component_1.ReportsComponent,
        canActivate: [seller_guard_1.SellerGuard],
        data: {
            expectedRol: ['admin', 'vendedor']
        }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
