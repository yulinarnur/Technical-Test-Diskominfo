import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const OrderProduct = sequelize.define('order_products', {
    orderId: {
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
          model: 'orders',
          key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
      timestamps: false,
      tableName: 'order_products',
  }
);

export default OrderProduct;
