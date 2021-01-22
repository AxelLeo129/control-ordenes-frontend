"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartService = void 0;
var core_1 = require("@angular/core");
var CartService = /** @class */ (function () {
    // total = 0;
    function CartService() {
        this.cart = [];
    }
    CartService.prototype.add = function (product, cantidad) {
        if (cantidad === void 0) { cantidad = 1; }
        this.cart = this.get();
        if (this.cart.length != 0) {
            var index = this.cart.findIndex(function (p) { return p.id === product.id; });
            if (index == -1) {
                product.qty = cantidad;
                product.total = product.precio;
                this.cart.push(product);
                this.increase((this.cart.length - 1), "push");
            }
            else {
                this.increase(index, "increase");
            }
        }
        else {
            product.qty = cantidad;
            product.total = product.precio;
            this.cart.push(product);
            this.increase(0, "push");
        }
        sessionStorage.setItem('products', JSON.stringify(this.cart));
    };
    CartService.prototype.get = function () {
        this.cart = JSON.parse(sessionStorage.getItem('products'));
        if (this.cart == null) {
            this.cart = [];
        }
        return this.cart;
    };
    CartService.prototype.clear = function () {
        this.cart = [];
        sessionStorage.setItem('products', JSON.stringify(this.cart));
    };
    CartService.prototype.increase = function (index, accion) {
        if (accion == "increase") {
            this.cart[index].qty += 1;
        }
        this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].precio);
        sessionStorage.setItem('products', JSON.stringify(this.cart));
        this.calculateTotal();
    };
    CartService.prototype.decrease = function (product) {
        this.cart = this.get();
        var index = this.cart.findIndex(function (p) { return p.id === product.id; });
        if (this.cart[index].qty > 1) {
            this.cart[index].qty = this.cart[index].qty - 1;
            this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].precio);
        }
        else {
            this.cart.splice(index, 1);
        }
        sessionStorage.setItem('products', JSON.stringify(this.cart));
        this.calculateTotal();
    };
    CartService.prototype.calculateTotal = function () {
        var finalPrice = this.getVariable('finalPrice');
        var totalQty = this.getVariable('totalQty');
        this.cart.forEach(function (item) {
            totalQty = totalQty + parseInt(item.qty);
            finalPrice = finalPrice + parseInt(item.total);
        });
        this.setVariable('finalPrice', finalPrice);
        this.setVariable('productCount', this.cart.length);
        this.setVariable('totalQty', totalQty);
    };
    CartService.prototype.getVariable = function (nombre) {
        var varible = JSON.parse(localStorage.getItem(nombre));
        console.log(varible, nombre);
        if (varible == null)
            varible = 0;
        return varible;
    };
    CartService.prototype.setVariable = function (nombre, valor) {
        sessionStorage.setItem(nombre, JSON.stringify(valor));
    };
    CartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
