import Order from '../../models/Order.js';
import Product from '../../models/Products.js';
import OrderProduct from '../../models/OrderProduct.js';

const updateProductStockAndSold = async (product, quantity) => {
    await product.update({
        stock: product.stock + quantity,
        sold: product.sold - quantity,
    });
};

export const deleteOrderService = async (orderId) => {
    try {
        const order = await Order.findByPk(orderId, {
            include: [{
                model: Product,
                through: { attributes: ['quantity'] },
            }],
        });

        if (!order) {
            return { error: true, message: 'Order not found' };
        }

        await Promise.all(order.products.map(product => 
            updateProductStockAndSold(product, product.order_products.quantity)
        ));

        await OrderProduct.destroy({ where: { orderId } });

        await Order.destroy({ where: { id: orderId } });

        const formattedDeletedOrder = {
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
            data: formattedDeletedOrder,
        };
        
    } catch (error) {
        return { error: true, message: `Failed to delete order: ${error.message}` };
    }
};
