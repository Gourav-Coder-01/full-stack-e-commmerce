import multer from "multer"

const storage = multer.diskStorage({
      filename:function(req,file,callback){
            callback(null,file.originalname)//passing null means no error occur
      }
})

const upload = multer({storage});

export default upload
