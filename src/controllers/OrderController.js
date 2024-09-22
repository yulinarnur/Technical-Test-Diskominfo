import { createOrderService } from '../service/orders/createOrder.js';
import { listOrdersService } from '../service/orders/listOrder.js';
import { getOrderDetailService } from '../service/orders/getOrderDetail.js';
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

export const listOrders = async (req, res) => {
    try {
        const result = await listOrdersService();
        if (result.error) {
            return sendErrResponse(res, 500, result.message);
        }

        return sendResponse(res, 200, 'Order List', result.data);
        
    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
};

export const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getOrderDetailService(id);
        
        if (result.error) {
            return sendErrResponse(res, 404, result.message);
        }

        return sendResponse(res, 200, 'Order Detail', result.data);
    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
};