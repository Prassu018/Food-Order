import express from 'express';
// const express = require('express');
import authMiddleware from '../Middleware/auth.js'
import { listOrders, placeOrder, userOrders } from '../Controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
export default orderRouter;
 