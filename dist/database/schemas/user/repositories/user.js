"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Repository_1 = require("../../../core/class/Repository");
const user_1 = __importDefault(require("../models/user"));
class UserRepository extends Repository_1.BaseRepository {
    constructor() {
        super(user_1.default);
    }
}
exports.UserRepository = UserRepository;
