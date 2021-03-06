"use strict";
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
var sgMail = require("@sendgrid/mail");
var ramda_adjunct_1 = require("ramda-adjunct");
var configs_1 = require("../configs");
var Users_1 = require("../entities/Users");
var common_1 = require("../utils/common");
var UserServices = /** @class */ (function () {
    function UserServices(userRepository) {
        this.userRepository = userRepository;
    }
    UserServices.prototype.createUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var existedUser, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: payload.email } })];
                    case 1:
                        existedUser = _a.sent();
                        if (!ramda_adjunct_1.isNilOrEmpty(existedUser)) {
                            throw new Error('User is existed');
                        }
                        newUser = new Users_1.default();
                        newUser.email = payload.email;
                        newUser.password = payload.password;
                        newUser.firstName = payload.firstName;
                        newUser.address = payload.address;
                        newUser.phoneNumber = payload.phoneNumber;
                        newUser.lastName = payload.lastName;
                        newUser.cityId = payload.cityId;
                        newUser.countryId = payload.countryId;
                        newUser.districtId = payload.districtId;
                        return [2 /*return*/, this.userRepository.save(newUser)];
                }
            });
        });
    };
    UserServices.prototype.loginUserServices = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var res, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        res = _c.sent();
                        _b = {};
                        return [4 /*yield*/, common_1.comparePassword(password, res.password)];
                    case 2: return [2 /*return*/, (_b.isValid = _c.sent(), _b.id = res.id, _b)];
                }
            });
        });
    };
    UserServices.prototype.requestOTPServices = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, otpCode, email, firstName, lastName, fullName, msg, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne(id)];
                    case 1:
                        res = _a.sent();
                        otpCode = common_1.generateOTPCode();
                        sgMail.setApiKey(configs_1.default.SEND_GRID.API_KEY);
                        email = res.email, firstName = res.firstName, lastName = res.lastName;
                        fullName = firstName + " " + lastName;
                        msg = {
                            to: email,
                            // To do: will change this email when have original email
                            from: 'khanh19934@gmail.com',
                            subject: 'Hotello Active Code',
                            text: 'Hotello Active code',
                            templateId: configs_1.default.SEND_GRID.TEMPLATE_ID,
                            dynamic_template_data: {
                                fullName: fullName,
                                otp: otpCode
                            }
                        };
                        sgMail.send(msg);
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.activeUser = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.userRepository.update(id, { isActive: true })];
            });
        });
    };
    return UserServices;
}());
exports.default = UserServices;
//# sourceMappingURL=UserServices.js.map