"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        console.log(file);
        callback(null, 'uploads/');
        console.log(1);
    },
    filename: function (req, file, callback) {
        console.log(file);
        const ext = path_1.default.extname(file.originalname);
        callback(null, `${Date.now()}${ext}`);
        console.log(1);
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    // fileFilter:function(req,file,callback){
    //     if( 
    //         file.mimetype == 'image/png' ||
    //         file.mimetype == 'image/jpg' || 
    //         file.mimetype == 'image/jpeg' ||
    //         file.mimetype == 'image/gif'||
    //         file.mimetype == 'image/bmp'
    //         ) {
    //         callback(null,true)
    //     }else{
    //         console.log('Only jpg,jpeg and png file supported');
    //         callback(null,false)
    //     }
    // },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});
exports.default = upload;
