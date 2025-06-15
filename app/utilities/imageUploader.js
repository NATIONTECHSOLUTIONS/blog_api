"use strict";
const multer =require('multer');
const path =require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file,cb){
        const uniqueName = `${Date.now()}.${file.originalName}`;
        cb(null, uniqueName);
    }
});
const fileFilter = (req, file, cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(path.extname(file.originalName).toLowerCase())
    cb(null, isValid);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
module.exports = upload;