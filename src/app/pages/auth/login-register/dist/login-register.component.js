"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginRegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginRegisterComponent = /** @class */ (function () {
    function LoginRegisterComponent(authService, router, toastrService) {
        this.authService = authService;
        this.router = router;
        this.toastrService = toastrService;
        this.logeado = false;
        this.logeado_fallido = false;
        this.roles = [];
        this.iniciar_sesion_activo = 'active';
        this.registro_activo = '';
        this.pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.login_form = this.createFormGroup();
        this.register_form = this.createFormGroup1();
    }
    LoginRegisterComponent.prototype.ngOnInit = function () {
        if (this.authService.getToken()) {
            this.logeado = true;
            this.logeado_fallido = false;
            this.roles = this.authService.getAuthorities();
        }
    };
    LoginRegisterComponent.prototype.createFormGroup = function () {
        return new forms_1.FormGroup({
            'nombre_usuario': new forms_1.FormControl('', [forms_1.Validators.required]),
            'password': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    };
    LoginRegisterComponent.prototype.createFormGroup1 = function () {
        return new forms_1.FormGroup({
            'nombre': new forms_1.FormControl('', [forms_1.Validators.required]),
            'email': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.pattern)]),
            'nombreUsuario': new forms_1.FormControl('', [forms_1.Validators.required]),
            'contrasenia': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    };
    LoginRegisterComponent.prototype.changeActive = function () {
        if (this.iniciar_sesion_activo == 'active') {
            this.registro_activo = 'active';
            this.iniciar_sesion_activo = '';
        }
        else {
            this.iniciar_sesion_activo = 'active';
            this.registro_activo = '';
        }
        ;
    };
    LoginRegisterComponent.prototype.login = function () {
        var _this = this;
        var objL = {
            nombreUsuario: this.login_form.value.nombre_usuario,
            password: this.login_form.value.password
        };
        this.authService.login(objL).then(function (res) {
            _this.logeado = true;
            _this.logeado_fallido = false;
            _this.authService.setToken(res.token);
            _this.authService.setUsername(res.nombreUsuario);
            _this.authService.setAuthorities(res.authorities);
            _this.roles = res.authorities;
            _this.authService.getUser(res.nombreUsuario).then(function (res) {
                _this.authService.setID(res.id);
                _this.router.navigate(["/products"]);
            })["catch"](function (err) {
                _this.logeado = false;
                _this.logeado_fallido = true;
                _this.toastrService.error('Error en nombre de usuario o contraseña.');
            });
        })["catch"](function (err) {
            _this.logeado = false;
            _this.logeado_fallido = true;
            _this.toastrService.error('Error en nombre de usuario o contraseña.');
        });
    };
    LoginRegisterComponent.prototype.signup = function () {
        var _this = this;
        var objR = {
            nombre: this.register_form.value.nombre,
            email: this.register_form.value.email,
            nombreUsuario: this.register_form.value.nombreUsuario,
            password: this.register_form.value.contrasenia
        };
        this.authService.newUser(objR).then(function (res) {
            _this.changeActive();
            _this.toastrService.success("Usuario guardado, por favor inicia sesión");
        })["catch"](function (err) {
            _this.logeado = false;
            _this.logeado_fallido = true;
            _this.toastrService.error('Error en nombre de usuario o contraseña.');
        });
    };
    Object.defineProperty(LoginRegisterComponent.prototype, "nombre_usuario", {
        get: function () {
            return this.login_form.get('nombre_usuario');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginRegisterComponent.prototype, "password", {
        get: function () {
            return this.login_form.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginRegisterComponent.prototype, "nombre", {
        get: function () {
            return this.register_form.get('nombre');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginRegisterComponent.prototype, "email", {
        get: function () {
            return this.register_form.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginRegisterComponent.prototype, "nombreUsuario", {
        get: function () {
            return this.register_form.get('nombreUsuario');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginRegisterComponent.prototype, "contrasenia", {
        get: function () {
            return this.register_form.get('contrasenia');
        },
        enumerable: false,
        configurable: true
    });
    LoginRegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-login-register',
            templateUrl: './login-register.component.html',
            styleUrls: ['./login-register.component.scss']
        })
    ], LoginRegisterComponent);
    return LoginRegisterComponent;
}());
exports.LoginRegisterComponent = LoginRegisterComponent;
