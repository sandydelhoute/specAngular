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
var Vote = (function () {
    function Vote() {
        this.vote = {};
    }
    Vote.prototype.validevote = function (playerChoosen) {
        console.log(this.vote.name);
    };
    return Vote;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Vote.prototype, "player", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Vote.prototype, "role", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Vote.prototype, "listPlayers", void 0);
Vote = __decorate([
    core_1.Component({
        selector: 'vote',
        templateUrl: './vote.html',
    })
], Vote);
exports.Vote = Vote;
//# sourceMappingURL=vote.component.js.map