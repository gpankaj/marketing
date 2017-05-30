"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RegisterComponent = (function () {
    function RegisterComponent(registerValidateService, flashMessagesService, authService, router) {
        this.registerValidateService = registerValidateService;
        this.flashMessagesService = flashMessagesService;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            email: this.email,
            password: this.password1,
        };
        if (!this.registerValidateService.validateRegsiter(this.email, this.password1, this.password2)) {
            this.flashMessagesService.show("Please fill in all the required fields.", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        if (!this.registerValidateService.validateEmail(user.email)) {
            this.flashMessagesService.show("Email is not right ", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        if (this.password1 == this.password2) {
            this.authService.registerUser(user).subscribe(function (data) {
                if (data.success) {
                    _this.flashMessagesService.show("You are now registered", { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/login']);
                }
                else {
                    _this.flashMessagesService.show("Failed to Register", { cssClass: 'alert-danger', timeout: 3000 });
                }
            });
            //this.flashMessagesService.show("Success",{cssClass:'alert-success',timeout:3000});
            return true;
        }
        else {
            this.flashMessagesService.show("Password does not match", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        //Register User
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map