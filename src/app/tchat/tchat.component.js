"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Tchat = (function () {
    function Tchat() {
        this.listmessages = new Array;
    }
    Tchat.prototype.submitMessage = function (text, errorMessage) {
        if (typeof text != 'undefined' && text != '') {
            errorMessage.classList.add('hidden');
            var message = {
                player: this.player.name,
                text: text,
                date: new Date(),
                role: this.player.role
            };
            this.listmessages.push(message);
        }
        else {
            errorMessage.classList.remove('hidden');
        }
    };
    return Tchat;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Tchat.prototype, "role", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Tchat.prototype, "player", void 0);
Tchat = __decorate([
    core_1.Component({
        selector: 'tchat',
        templateUrl: './tchat.html',
        styleUrls: ['./tchat.css'],
    })
], Tchat);
exports.Tchat = Tchat;
//# sourceMappingURL=tchat.component.js.map