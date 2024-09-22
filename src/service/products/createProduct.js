import Product from '../../models/Products.js';
import { validateName, validatePrice, validateStock } from '../../utils/productValidation.js';

export const createProductService = async (productData) => {
    const errors = {};

    const nameValidation = validateName(productData.name);
    if (!nameValidation.valid) {
        errors.name = [nameValidation.message];
    }

    const priceValidation = validatePrice(productData.price);
    if (!priceValidation.valid) {
        errors.price = [priceValidation.message];
    }

    const stockValidation = validateStock(productData.stock);
    if (!stockValidation.valid) {
        errors.stock = [stockValidation.message];
    }

    if (Object.keys(errors).length > 0) {
        return { error: true, message: 'Validation failed', errors };
    }

    try {
        const product = await Product.create({
            name: productData.name,
            price: productData.price,
            stock: productData.stock,
            sold: 0,
        });

        return {
            error: false,
            data: {
              id: product.id,
              name: product.name,
              price: product.price,
              stock: product.stock,
              sold: product.sold,
              created_at: product.created_at,
              updated_at: product.updated_at,
          },
        };
    } catch (error) {
        return { error: true, message: 'Failed to create product' };
    }
};
