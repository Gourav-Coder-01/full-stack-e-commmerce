import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
      name: {type: String, required: true},
      description: {type: String,required: true},
      price: {type: Number, required: true},
      image: {type: Array, required: true},
      category: {type: String, required: true}, 
      subCategory: {type: String, required: true},
      sizes: {type: Array, required: true},
      bestseller: {type: Boolean},
      date: {type: Number, required: true},
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);// product schema ka use krke product create hoga data


export default productModel;

// Checks if a model named "product" already exists in the cache.
// If it does, it reuses that model instead of redefining it.

//If the model(product) doesn’t exist yet, this creates a new one using the provided schema.


