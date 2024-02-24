"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/user/index");
const router = (0, express_1.Router)();
router.route('/')
    .get(index_1.UserController.find)
    .post(index_1.UserController.create);
router.route('/:id')
    .get(index_1.UserController.findOne)
    .put(index_1.UserController.update)
    .delete(index_1.UserController.delete);
exports.default = router;
