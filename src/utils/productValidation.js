import Product from "../models/Products.js";

const PRICE_FORMAT = /^\d+$/; 
const STOCK_FORMAT = /^\d+$/; 

export const validateName = (name) => {
    if (!name) {
        return { valid: false, message: "The name field is required." };
    }
    return { valid: true };
};

export const validatePrice = (price) => {
    if (price === undefined) {
        return { valid: false, message: "The price field is required." };
    }
    if (!PRICE_FORMAT.test(price)) {
        return { valid: false, message: "The price field must be a number." };
    }
    return { valid: true };
};

export const validateStock = (stock) => {
    if (stock === undefined) {
      return { valid: false, message: "The stock field is required." };
    }
    if (!STOCK_FORMAT.test(stock)) {
      return { valid: false, message: "The stock field must be a number." };
    }
    return { valid: true };
};

export const validateProduct = async (productData) => {
    const errors = {};

    const nameValidation = validateName(productData.name);
    if (!nameValidation.valid) { errors.name = [nameValidation.message]; }

    const priceValidation = validatePrice(productData.price);
    if (!priceValidation.valid) { errors.price = [priceValidation.message]; }

    const stockValidation = validateStock(productData.stock);
    if (!stockValidation.valid) { errors.stock = [stockValidation.message]; }

    if (Object.keys(errors).length === 0) {
        const existProduct = await Product.findOne({
            where: { name: productData.name },
        });
        if (existProduct) {
            errors.name = ["Product with the same name already exists"];
        }
    }

    return errors;
};
