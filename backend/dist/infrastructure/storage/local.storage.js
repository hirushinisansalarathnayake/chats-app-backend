"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.LocalStorage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
    },
});
//# sourceMappingURL=local.storage.js.map