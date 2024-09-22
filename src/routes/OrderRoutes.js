import express from 'express';
import { createOrder, listOrders, getOrderDetail } from '../controllers/OrderController.js';

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary:
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           price:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                           stock:
 *                             type: integer
 *                           sold:
 *                             type: integer
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/orders/list:
 *   get:
 *     summary:
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             price:
 *                               type: integer
 *                             quantity:
 *                               type: integer
 *                             stock:
 *                               type: integer
 *                             sold:
 *                               type: integer
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                             updated_at:
 *                               type: string
 *                               format: date-time
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order detail by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order detail retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           price:
 *                             type: integer
 *                           quantity:
 *                             type: integer
 *                           stock:
 *                             type: integer
 *                           sold:
 *                             type: integer
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/api/orders', createOrder);
router.get('/api/orders/list', listOrders); 
router.get('/api/orders/:id', getOrderDetail);

export default router;