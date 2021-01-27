"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalAddCartComponent = void 0;
var core_1 = require("@angular/core");
var ModalAddCartComponent = /** @class */ (function () {
    function ModalAddCartComponent(modal, cartService, toastrService, change) {
        this.modal = modal;
        this.cartService = cartService;
        this.toastrService = toastrService;
        this.change = change;
        this.cantidad = 1;
        this.total = 0;
    }
    ModalAddCartComponent.prototype.ngOnInit = function () {
        this.total = (this.cantidad * this.producto.precio);
    };
    ModalAddCartComponent.prototype.sum = function () {
        this.cantidad++;
        this.total = (this.cantidad * this.producto.precio);
        this.change.detectChanges();
    };
    ModalAddCartComponent.prototype.rest = function () {
        if (this.cantidad > 0) {
            this.cantidad--;
            this.total = (this.cantidad * this.producto.precio);
            this.change.detectChanges();
        }
    };
    ModalAddCartComponent.prototype.addToCart = function () {
        this.cartService.add(this.producto, this.cantidad);
        this.toastrService.success('Producto agregado al carrito');
        this.modal.dismiss();
    };
    __decorate([
        core_1.Input()
    ], ModalAddCartComponent.prototype, "producto");
    ModalAddCartComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-add-cart',
            templateUrl: './modal-add-cart.component.html',
            styleUrls: ['./modal-add-cart.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ModalAddCartComponent);
    return ModalAddCartComponent;
}());
exports.ModalAddCartComponent = ModalAddCartComponent;
