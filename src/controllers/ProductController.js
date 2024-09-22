import { createProductService } from "../service/products/createProduct.js";
import { sendResponse, sendErrResponse } from "../utils/responseUtils.js";

export const createProduct = async (req, res) => {
    try {
        const result = await createProductService(req.body);

        if (result.error) {
          return sendResponse(res, 422, result.message, result.errors); 
        }

        return sendResponse(res, 201, "Product created successfully", result.data);
    } catch (error) {
        console.error("Error:", error);
        return sendErrResponse(res, 500, "Internal server error", false, {
          error: error.message,
        });
    }
};
