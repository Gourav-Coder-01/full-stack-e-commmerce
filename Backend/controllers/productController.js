import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
//function for add product

const addProduct = async (req , res) => {

      try {
            
            const {name, description, price, category, subCategory,sizes, bestseller} = req.body;
            const image1 = req.files.image1 && req.files.image1[0]  // hamne ek file hi upload ki hai but ye array ki form me hi ayega
            const image2 = req.files.image2 && req.files.image2[0]
            const image3 = req.files.image3 && req.files.image3[0]
            const image4 = req.files.image4 && req.files.image4[0]

            // we upload images in cloudinary and get url of images and we use that url to get images
            
            const images = [image1,image2,image3,image4].filter((item)=> item !== undefined) // if item is not undefine then only store in images

            let imagesUrl = await Promise.all(
                  images.map(async(item)=>{
                        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                        return result.secure_url 
                  })
            )

           

            // console.log(image1,image2,image3,image4);

            // console.log(images);
            // console.log(imagesUrl);

            const productData = {
                  name,
                  description,
                  category,
                  subCategory,
                  price: Number(price),
                  bestseller: bestseller === "true" ? true : false,
                  sizes: JSON.parse(sizes),// convert sting into array
                  image:imagesUrl,
                  date:Date.now()
            }
            
            console.log(productData);

            const product = new productModel(productData);
            await product.save()

            res.json({success:true,message:"product Added"});


      } catch (error) {
            console.log(error)
            res.json({success:false, msg:error.message})
      }

};
 
//function for list product

const listProduct = async (req, res) => {


      try {
            
            const products = await productModel.find({});
            res.json({success:true,products});

      } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
      }

};

//function for removing product

const removeProduct = async (req, res) => {


      try {
           
            await productModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"Product Removed"})
            
      } catch (error) {
             console.log(error)
            res.json({success:false,message:error.message})
      }


};
//function for single product info

const singleProduct = async (req, res) => {

      try {
            
            const {productId} = req.body;
            const product = await productModel.findById(productId);
            res.json({success:true,product});

      } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
      }

};

export { listProduct, removeProduct, addProduct, singleProduct };
