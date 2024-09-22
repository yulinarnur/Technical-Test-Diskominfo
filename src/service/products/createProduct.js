import Product from "../../models/Products.js";
import { validateProduct } from "../../utils/productValidation.js";

export const createProductService = async (productData) => {
    const errors = await validateProduct(productData);

    if (Object.keys(errors).length > 0) {
        return { error: true, message: "Validation failed", errors };
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
        throw new Error("Failed to create product");
    }
};
