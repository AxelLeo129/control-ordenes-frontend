"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalProductComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ModalProductComponent = /** @class */ (function () {
    function ModalProductComponent(authService, activeModal, generalService, utilitiesService, toastrService) {
        this.authService = authService;
        this.activeModal = activeModal;
        this.generalService = generalService;
        this.utilitiesService = utilitiesService;
        this.toastrService = toastrService;
        this.loading = false;
        this.save_form = this.createFormGroup();
    }
    ModalProductComponent.prototype.ngOnInit = function () {
        this.buttons = Object.values(document.getElementsByTagName('button'));
        this.verifyIncommingData();
    };
    ModalProductComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            'nombre': new forms_1.FormControl('', [forms_1.Validators.required]),
            'precio': new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    ModalProductComponent.prototype.verifyIncommingData = function () {
        if (this.producto != false) {
            this.save_form.controls['nombre'].setValue(this.producto.nombre);
            this.save_form.controls['precio'].setValue(this.producto.precio);
        }
    };
    ModalProductComponent.prototype.create = function () {
        var _this = this;
        this.buttons.forEach(function (element) {
            element.disabled = true;
        });
        this.loading = true;
        if (this.producto != false) {
            this.producto.nombre = this.save_form.value.nombre;
            this.producto.precio = this.save_form.value.precio;
            this.utilitiesService.showSweetAlertConfirm('¡Atención!', "<p>\u00BFEst\u00E1 seguro de actualizar este producto?<p>", 'Aceptar', 'Cancelar').then(function (res) {
                if (res.isConfirmed == true) {
                    _this.generalService.put('/update/' + _this.producto.id, _this.producto).then(function () {
                        _this.buttons.forEach(function (element) {
                            element.disabled = false;
                        });
                        _this.loading = false;
                        _this.activeModal.close('reload');
                        _this.toastrService.success("Producto actualizado exitosamente.");
                    })["catch"]((function (err) {
                        _this.buttons.forEach(function (element) {
                            element.disabled = false;
                        });
                        console.log(err);
                        _this.loading = false;
                        _this.activeModal.close();
                        _this.toastrService.error('Error, por favor, intenta más tarde.');
                    }));
                }
                else {
                    _this.buttons.forEach(function (element) {
                        element.disabled = false;
                    });
                    _this.loading = false;
                }
            });
        }
        else {
            var objU = {
                nombre: this.save_form.value.nombre,
                precio: this.save_form.value.precio,
                vendedor: JSON.parse(this.authService.getID())
            };
            this.generalService.post('/create', objU).then(function () {
                _this.buttons.forEach(function (element) {
                    element.disabled = false;
                });
                _this.loading = false;
                _this.activeModal.close('reload');
                _this.toastrService.success("Producto almacenado exitosamente.");
            })["catch"]((function (err) {
                console.log(err);
                _this.buttons.forEach(function (element) {
                    element.disabled = false;
                });
                _this.loading = false;
                _this.activeModal.close();
                _this.toastrService.error('Error, por favor, intenta más tarde.');
            }));
        }
    };
    Object.defineProperty(ModalProductComponent.prototype, "nombre", {
        get: function () {
            return this.save_form.get('nombre');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModalProductComponent.prototype, "precio", {
        get: function () {
            return this.save_form.get('precio');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], ModalProductComponent.prototype, "producto");
    ModalProductComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-product',
            templateUrl: './modal-product.component.html',
            styleUrls: ['./modal-product.component.scss']
        })
    ], ModalProductComponent);
    return ModalProductComponent;
}());
exports.ModalProductComponent = ModalProductComponent;
