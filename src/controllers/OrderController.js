import { createOrderService } from '../service/orders/createOrder.js';
import { sendResponse, sendErrResponse } from '../utils/responseUtils.js';

export const createOrder = async (req, res) => {
    const { products } = req.body;
    try {
        const result = await createOrderService({ products });
        if (result.error) {
            return sendErrResponse(res, 400, result.message, false)
        }

        return sendResponse(res, 200, 'Order created', result.data);
    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
}