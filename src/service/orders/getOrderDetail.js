import Order from '../../models/Order.js';
import Product from '../../models/Products.js';

export const getOrderDetailService = async (orderId) => {
    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Product,
                    through: { attributes: ['quantity'] },
                },
            ],
        });

        if (!order) {
            return { error: true, message: `Order not found` };
        }

        const formattedOrder = {
            id: order.id,
            products: order.products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.order_products.quantity,
                stock: product.stock,
                sold: product.sold,
                created_at: product.created_at,
                updated_at: product.updated_at,
            })),
            created_at: order.created_at,
            updated_at: order.updated_at,
        };

        return {
            error: false,
            data: formattedOrder,
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
};
