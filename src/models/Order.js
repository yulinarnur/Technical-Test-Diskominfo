import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Product from './Products.js';
import OrderProduct from './OrderProduct.js';

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    timestamps: false,
    tableName: 'orders',
  }
);

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', otherKey: 'productId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId', otherKey: 'orderId' });

export default Order;