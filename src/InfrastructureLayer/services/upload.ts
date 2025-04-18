import { Request } from "express";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  
  destination: function (req: Request, file , callback) {
    console.log(file);
    callback(null, 'uploads/');
    console.log(1);

  },
  filename: function (req: Request, file , callback) {
    console.log(file);
    const ext = path.extname(file.originalname);
    callback(null, `${Date.now()}${ext}`);
    console.log(1);

  },
});

var upload = multer ({
  storage:storage,
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
  limits:{
      fileSize: 1024*1024*2
  }
});
  

export default upload;
