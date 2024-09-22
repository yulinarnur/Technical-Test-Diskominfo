import { createProductService } from '../service/products/createProduct.js';
import { getProductsService } from '../service/products/getProduct.js';
import { getProductByIdService } from '../service/products/getProduct.js';
import { updateProductService } from '../service/products/updateProduct.js';
import { deleteProductService } from '../service/products/deleteProduct.js';
import { sendResponse, sendErrResponse } from '../utils/responseUtils.js';

export const createProduct = async (req, res) => {
    try {
        const result = await createProductService(req.body);

        if (result.error) {
          return sendResponse(res, 422, result.message, result.errors); 
        }

        return sendResponse(res, 201, 'Product created successfully', result.data);
    } catch (error) {
        console.error('Error:', error);
        return sendErrResponse(res, 500, 'Internal server error', false, {
          error: error.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        return sendResponse(res, 200, 'Product List', products);
    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, {
          error: error.message,
        });
      }
};

export const getProductById = async (req, res) => {
    const { id } = req.params; 
    try {
        const product = await getProductByIdService(id);
        if (!product) {
            return sendErrResponse(res, 404, 'Product not found', false, null);
        }

        return sendResponse(res, 200, 'Product Detail', product);

    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await updateProductService(id, req.body);

        if (result.error) {
            return sendErrResponse(res, 404, result.message, false);
        }

        return sendResponse(res, 200, 'Product updated successfully', result.data);

    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteProductService(id);

        if (result.error) {
          return sendErrResponse(res, 404, result.message, false);
        }

        return sendResponse(res, 200, 'Product deleted successfully', result.data);

    } catch (error) {
        return sendErrResponse(res, 500, 'Internal server error', false, { error: error.message });
    }
};