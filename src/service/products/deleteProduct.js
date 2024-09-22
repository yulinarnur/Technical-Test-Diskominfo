import Product from '../../models/Products.js';

export const deleteProductService = async (id) => {
    try {

        const product = await Product.findByPk(id);
        if (!product) {
            return { error: true, message: 'Product not found' };
        }

        const productData = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            sold: product.sold,
            created_at: product.created_at,
            updated_at: product.updated_at,
        };

        await product.destroy();

        return { error: false,  data: productData };

    } catch (error) {
        return { error: true, message: 'Failed to delete product' };
    }
};