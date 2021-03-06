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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var common_1 = require("../utils/common");
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.loadTempPassword = function () {
        if (this.password) {
            this.tempPassword = this.password;
        }
    };
    Users.prototype.encryptPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.tempPassword !== this.password)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, common_1.createHash(this.password)];
                    case 1:
                        _a.password = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ name: 'last_name' }),
        __metadata("design:type", String)
    ], Users.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column({ name: 'first_name' }),
        __metadata("design:type", String)
    ], Users.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({ name: 'address' }),
        __metadata("design:type", String)
    ], Users.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ name: 'phone_number' }),
        __metadata("design:type", String)
    ], Users.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.Column({ name: 'country_id' }),
        __metadata("design:type", Number)
    ], Users.prototype, "countryId", void 0);
    __decorate([
        typeorm_1.Column({ name: 'city_id' }),
        __metadata("design:type", Number)
    ], Users.prototype, "cityId", void 0);
    __decorate([
        typeorm_1.Column({ name: 'district_id' }),
        __metadata("design:type", Number)
    ], Users.prototype, "districtId", void 0);
    __decorate([
        typeorm_1.Column({ name: 'hotel_id' }),
        __metadata("design:type", Number)
    ], Users.prototype, "hotelId", void 0);
    __decorate([
        typeorm_1.Column({ name: 'role' }),
        __metadata("design:type", String)
    ], Users.prototype, "role", void 0);
    __decorate([
        typeorm_1.Column({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Users.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({ name: 'updated_at' }),
        __metadata("design:type", Date)
    ], Users.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({ name: 'is_active' }),
        __metadata("design:type", Boolean)
    ], Users.prototype, "isActive", void 0);
    __decorate([
        typeorm_1.AfterLoad(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Users.prototype, "loadTempPassword", null);
    __decorate([
        typeorm_1.BeforeUpdate(),
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Users.prototype, "encryptPassword", null);
    Users = __decorate([
        typeorm_1.Entity()
    ], Users);
    return Users;
}());
exports.Users = Users;
exports.default = Users;
//# sourceMappingURL=Users.js.map