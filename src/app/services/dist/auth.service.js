"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var TOKEN_KEY = 'AuthToken';
var USERNAME_KEY = 'AuthUserName';
var AUTHORITIES_KEY = 'AuthAuthorities';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.roles = [];
        this.auth_URL = 'http://localhost:8080/auth';
    }
    AuthService.prototype.newUser = function (nuevo_usuario) {
        return this.http.post(this.auth_URL + '/nuevo', nuevo_usuario).toPromise();
    };
    AuthService.prototype.login = function (usuario) {
        return this.http.post(this.auth_URL + '/login', usuario).toPromise();
    };
    AuthService.prototype.getUser = function (username) {
        return this.http.get(this.auth_URL + '/userdetailname/' + username).toPromise();
    };
    AuthService.prototype.setToken = function (token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    };
    AuthService.prototype.getToken = function () {
        return sessionStorage.getItem(TOKEN_KEY);
    };
    AuthService.prototype.setUsername = function (username) {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, username);
    };
    AuthService.prototype.getUsername = function () {
        return sessionStorage.getItem(USERNAME_KEY);
    };
    AuthService.prototype.setAuthorities = function (authorities) {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    };
    AuthService.prototype.getAuthorities = function () {
        var _this = this;
        this.roles = [];
        if (sessionStorage.getItem(AUTHORITIES_KEY)) {
            JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(function (element) {
                _this.roles.push(element.authority);
            });
        }
        return this.roles;
    };
    AuthService.prototype.logOut = function () {
        window.sessionStorage.clear();
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
