import Product from '../src/models/Products.js';
import { getProductsService, getProductByIdService } from '../src/service/products/getProduct.js';

jest.mock('../src/models/Products.js'); 

describe('Product Services', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe('getProductsService', () => {
        it('should return a list of products', async () => {
            const mockProducts = [
                { id: 1, name: 'Product A', price: 100, stock: 10, sold: 5, created_at: new Date(), updated_at: new Date() },
                { id: 2, name: 'Product B', price: 200, stock: 20, sold: 10, created_at: new Date(), updated_at: new Date() }
            ];

            Product.findAll.mockResolvedValue(mockProducts); 

            const result = await getProductsService();

            expect(result).toEqual(mockProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                sold: product.sold,
                created_at: product.created_at,
                updated_at: product.updated_at,
            })));
        });

        it('should throw an error if unable to retrieve products', async () => {
            Product.findAll.mockRejectedValue(new Error('Database error')); 

           
            await expect(getProductsService()).rejects.toThrow('Failed to retrieve products');
        });
    });

    describe('getProductByIdService', () => {
        it('should return a product by id', async () => {
            const mockProduct = { id: 1, name: 'Product A', price: 100, stock: 10, sold: 5, created_at: new Date(), updated_at: new Date() };

            Product.findOne.mockResolvedValue(mockProduct); 

            const result = await getProductByIdService(1);

            expect(result).toEqual(mockProduct);
        });

        it('should throw an error if unable to retrieve product by id', async () => {
            Product.findOne.mockRejectedValue(new Error('Database error')); 

            await expect(getProductByIdService(1)).rejects.toThrow('Failed to retrieve products');
        });
    });
});