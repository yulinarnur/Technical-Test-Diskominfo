import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js'; 


const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            notEmpty: true, 
        },
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, 
        },
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},{
    timestamps: false,
    tableName: 'products',
  }
);

export default Product;