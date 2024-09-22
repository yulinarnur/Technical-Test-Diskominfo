import Order from "../../models/Order.js";
import Product from "../../models/Products.js";
import OrderProduct from "../../models/OrderProduct.js";

const updateProductStockAndSold = async (product, quantity) => {
    await product.update({ stock: product.stock - quantity });
    await product.update({ sold: product.sold + quantity });
};

const createOrderProducts = async (order, products) => {
    const orderProducts = [];
    for (const item of products) {
        const product = await Product.findByPk(item.id);
        if (!product) {
            return { error: true, message: `Product not found` };
        }

        if (product.stock < item.quantity) {
            return { error: true, message: `Product out of stock` };
        }

        await updateProductStockAndSold(product, item.quantity);

        orderProducts.push({
            orderId: order.id,
            productId: item.id,
            quantity: item.quantity,
        });
    }
    return { error: false, orderProducts };
};

const fetchCreatedOrder = async (orderId) => {
    return await Order.findByPk(orderId, {
        include: [
            {
                model: Product,
                through: { attributes: ["quantity"] },
            },
        ],
    });
};

export const createOrderService = async (orderData) => {
    const order = await Order.create();
    const result = await createOrderProducts(order, orderData.products);
    
    if (result.error) {
        return { error: true, message: result.message };
    }

    await OrderProduct.bulkCreate(result.orderProducts);

    const createdOrder = await fetchCreatedOrder(order.id);

    return {
        error: false,
        data: {
            id: createdOrder.id,
            products: createdOrder.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.order_products?.quantity || 0,
                stock: product.stock,
                sold: product.sold,
                created_at: product.created_at,
                updated_at: product.updated_at,
            })),
            created_at: createdOrder.created_at,
            updated_at: createdOrder.updated_at,
        },
    };
};
