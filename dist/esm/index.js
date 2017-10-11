var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export * from '@ionic/cloud';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEventPattern';
import { Injectable, NgModule, OpaqueToken } from '@angular/core';
import { Auth as _Auth, FacebookAuth as _FacebookAuth, GoogleAuth as _GoogleAuth, Client as _Client, Config as _Config, Deploy as _Deploy, DIContainer as _DIContainer, Insights as _Insights, Push as _Push, User as _User, } from '@ionic/cloud';
var Rx = /** @class */ (function () {
    function Rx(emitter) {
        this.emitter = emitter;
    }
    return Rx;
}());
export { Rx };
var PushRx = /** @class */ (function (_super) {
    __extends(PushRx, _super);
    function PushRx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushRx.prototype.notification = function () {
        var _this = this;
        return Observable.fromEventPattern(function (h) {
            return _this.emitter.on('push:notification', function (data) {
                return h(data.message);
            });
        }, function (_) {
            // https://github.com/ReactiveX/rxjs/issues/1900
            // this.emitter.off(signal);
        });
    };
    return PushRx;
}(Rx));
export { PushRx };
var FacebookAuth = /** @class */ (function (_super) {
    __extends(FacebookAuth, _super);
    function FacebookAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FacebookAuth = __decorate([
        Injectable()
    ], FacebookAuth);
    return FacebookAuth;
}(_FacebookAuth));
export { FacebookAuth };
var GoogleAuth = /** @class */ (function (_super) {
    __extends(GoogleAuth, _super);
    function GoogleAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleAuth = __decorate([
        Injectable()
    ], GoogleAuth);
    return GoogleAuth;
}(_GoogleAuth));
export { GoogleAuth };
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth = __decorate([
        Injectable()
    ], Auth);
    return Auth;
}(_Auth));
export { Auth };
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Client = __decorate([
        Injectable()
    ], Client);
    return Client;
}(_Client));
export { Client };
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Config = __decorate([
        Injectable()
    ], Config);
    return Config;
}(_Config));
export { Config };
var Deploy = /** @class */ (function (_super) {
    __extends(Deploy, _super);
    function Deploy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deploy = __decorate([
        Injectable()
    ], Deploy);
    return Deploy;
}(_Deploy));
export { Deploy };
var DIContainer = /** @class */ (function (_super) {
    __extends(DIContainer, _super);
    function DIContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DIContainer = __decorate([
        Injectable()
    ], DIContainer);
    return DIContainer;
}(_DIContainer));
export { DIContainer };
var Insights = /** @class */ (function (_super) {
    __extends(Insights, _super);
    function Insights() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Insights = __decorate([
        Injectable()
    ], Insights);
    return Insights;
}(_Insights));
export { Insights };
var Push = /** @class */ (function (_super) {
    __extends(Push, _super);
    function Push() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Push = __decorate([
        Injectable()
    ], Push);
    return Push;
}(_Push));
export { Push };
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User = __decorate([
        Injectable()
    ], User);
    return User;
}(_User));
export { User };
export var CloudSettingsToken = new OpaqueToken('CloudSettings');
export function provideContainer(settings) {
    var container = new DIContainer();
    container.config.register(settings);
    container.core.init();
    container.cordova.bootstrap();
    return container;
}
export function provideConfig(container) {
    return container.config;
}
export function provideAuth(container) {
    return container.auth;
}
export function provideClient(container) {
    return container.client;
}
export function provideDeploy(container) {
    return container.deploy;
}
export function provideUser(container) {
    return container.singleUserService.current();
}
export function providePush(container) {
    var push = container.push;
    push.rx = new PushRx(container.eventEmitter);
    return push;
}
export function provideFacebookAuth(container) {
    return container.facebookAuth;
}
export function provideGoogleAuth(container) {
    return container.googleAuth;
}
var CloudModule = /** @class */ (function () {
    function CloudModule() {
    }
    CloudModule_1 = CloudModule;
    CloudModule.forRoot = function (settings) {
        return {
            ngModule: CloudModule_1,
            providers: [
                { provide: CloudSettingsToken, useValue: settings },
                { provide: DIContainer, useFactory: provideContainer, deps: [CloudSettingsToken] },
                { provide: Auth, useFactory: provideAuth, deps: [DIContainer] },
                { provide: Client, useFactory: provideClient, deps: [DIContainer] },
                { provide: Config, useFactory: provideConfig, deps: [DIContainer] },
                { provide: Deploy, useFactory: provideDeploy, deps: [DIContainer] },
                { provide: Push, useFactory: providePush, deps: [DIContainer] },
                { provide: User, useFactory: provideUser, deps: [DIContainer] },
                { provide: FacebookAuth, useFactory: provideFacebookAuth, deps: [DIContainer] },
                { provide: GoogleAuth, useFactory: provideGoogleAuth, deps: [DIContainer] }
            ]
        };
    };
    CloudModule = CloudModule_1 = __decorate([
        NgModule()
    ], CloudModule);
    return CloudModule;
    var CloudModule_1;
}());
export { CloudModule };
