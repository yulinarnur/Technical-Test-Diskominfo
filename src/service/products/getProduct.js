import Product from '../../models/Products.js';

export const getProductsService = async () => {
    try {
        const products = await Product.findAll();
        return products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            sold: product.sold,
            created_at: product.created_at,
            updated_at: product.updated_at,
      }));
    } catch (error) {
        throw new Error('Failed to retrieve products');
    }
};

export const getProductByIdService = async (id) => {
    try {
        const product = await Product.findOne({
            where: { id }
        });

        return product;
    } catch (error) {
        throw new Error('Failed to retrieve products');
    }
}

