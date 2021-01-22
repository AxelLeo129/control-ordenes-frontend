"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(cartService) {
        this.cartService = cartService;
        this.cart = [];
        this.total = 0;
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        this.getCart();
    };
    CheckoutComponent.prototype.getCart = function () {
        this.cart = this.cartService.get();
        var total_temporal = 0;
        this.cart.forEach(function (e) {
            total_temporal = total_temporal + parseInt(e.total);
        });
        this.total = total_temporal;
    };
    CheckoutComponent.prototype.rest = function (producto, indice) {
        if (producto.qty > 0) {
            producto.qty--;
            this.cartService.decrease(producto);
            this.getCart();
        }
    };
    CheckoutComponent.prototype.sum = function (producto) {
        producto.qty++;
        this.cartService.add(producto, producto.qty++);
        this.getCart();
    };
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
