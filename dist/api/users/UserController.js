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
var Boom = require("boom");
var UserDTO_1 = require("../../repositories/DTO/UserDTO");
var common_1 = require("../../utils/common");
var UserController = /** @class */ (function () {
    function UserController(userServices) {
        this.userServices = userServices;
    }
    UserController.prototype.requestOTP = function (req, h) {
        return __awaiter(this, void 0, void 0, function () {
            var id, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.payload.id;
                        return [4 /*yield*/, this.userServices.requestOTPServices(id)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            return [2 /*return*/, h.response({ statusCode: 200, message: 'OK', data: null })];
                        }
                        throw Boom.forbidden('User Not Found');
                }
            });
        });
    };
    UserController.prototype.validateOTP = function (req, h) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, otpCode, id, _b, isValid, message;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.payload, otpCode = _a.otpCode, id = _a.id;
                        _b = common_1.checkValidOTPCode(otpCode), isValid = _b.isValid, message = _b.message;
                        if (!isValid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userServices.activeUser({ id: id })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, h.response({ statusCode: 200, message: 'OK', data: null })];
                    case 2: return [2 /*return*/, h.response({ statusCode: 200, message: message, data: null })];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, h) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userServices.createUser(req.payload)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, h.response({ statusCode: 200, message: 'ok', data: UserDTO_1.convertRegisterResponseDTO(res) })];
                    case 2:
                        e_1 = _a.sent();
                        throw Boom.forbidden(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, h) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, _b, isValid, id;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.payload, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userServices.loginUserServices({
                                email: email,
                                password: password
                            })];
                    case 1:
                        _b = _c.sent(), isValid = _b.isValid, id = _b.id;
                        if (isValid) {
                            return [2 /*return*/, h.response({
                                    statusCode: 200,
                                    message: 'SUCCESS',
                                    accessToken: common_1.getToken(id)
                                })];
                        }
                        throw Boom.unauthorized();
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map