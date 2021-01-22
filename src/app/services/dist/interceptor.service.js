"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.interceptorProvider = exports.InterceptorService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var InterceptorService = /** @class */ (function () {
    function InterceptorService(tokenService) {
        this.tokenService = tokenService;
    }
    InterceptorService.prototype.intercept = function (req, next) {
        var intReq = req;
        var token = this.tokenService.getToken();
        if (token != null) {
            intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(intReq);
    };
    InterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], InterceptorService);
    return InterceptorService;
}());
exports.InterceptorService = InterceptorService;
exports.interceptorProvider = [{ provide: http_1.HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }];
