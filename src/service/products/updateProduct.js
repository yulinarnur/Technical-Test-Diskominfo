import Product from "../../models/Products.js";

export const updateProductService = async (id, productData) => {
  const { name, price, stock } = productData;

  try {
      const product = await Product.findByPk(id);
      if (!product) {
          return { error: true, message: "Product not found" };
      }

      product.name = name;
      product.price = price;
      product.stock = stock;

      await product.save();

      return {
          error: false,
          data: product,
      };

  } catch (error) {
      return { error: true, message: "Failed to update product" };
  }
};