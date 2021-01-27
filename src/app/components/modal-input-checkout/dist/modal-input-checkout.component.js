"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalInputCheckoutComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ModalInputCheckoutComponent = /** @class */ (function () {
    function ModalInputCheckoutComponent(modal, generalService, cartService, toastrService) {
        this.modal = modal;
        this.generalService = generalService;
        this.cartService = cartService;
        this.toastrService = toastrService;
        this.name_form = this.createFormGroup();
    }
    ModalInputCheckoutComponent.prototype.ngOnInit = function () {
        this.buttons = Object.values(document.getElementsByTagName('button'));
    };
    ModalInputCheckoutComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            'nombre': new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    ModalInputCheckoutComponent.prototype.buy = function () {
        var _this = this;
        this.buttons.forEach(function (element) {
            element.disabled = true;
        });
        var objC = {
            nombre: this.name_form.value.nombre,
            total: this.total
        };
        this.generalService.post('/compra/create', objC).then(function (res) {
            var id = parseInt(res.mensaje.split(">", 2)[1]);
            var promesas = [];
            var carrito = _this.cartService.get();
            carrito.forEach(function (element) {
                var objPC = {
                    cantidad: element.qty,
                    compra: id,
                    producto: element.id,
                    precio: element.precio
                };
                promesas.push(_this.generalService.post('/producto_compra/create', objPC));
            });
            Promise.all(promesas).then(function () {
                _this.buttons.forEach(function (element) {
                    element.disabled = false;
                });
                _this.modal.close('reload');
                sessionStorage.removeItem('products');
                _this.toastrService.success("Compra realizada exitosamente.");
            })["catch"](function (err) {
                console.log(err);
                _this.modal.close();
                _this.toastrService.error("Error, por favor inténtelo más tarde.");
            });
        });
    };
    Object.defineProperty(ModalInputCheckoutComponent.prototype, "nombre", {
        get: function () {
            return this.name_form.get('nombre');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], ModalInputCheckoutComponent.prototype, "total");
    ModalInputCheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-input-checkout',
            templateUrl: './modal-input-checkout.component.html',
            styleUrls: ['./modal-input-checkout.component.scss']
        })
    ], ModalInputCheckoutComponent);
    return ModalInputCheckoutComponent;
}());
exports.ModalInputCheckoutComponent = ModalInputCheckoutComponent;
