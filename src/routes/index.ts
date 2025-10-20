import { Router } from "express";
import ordersRouter from "./orders/orders.router.js";

const router = Router();

const routersBase = {
    odersV1: '/api/v1/orders'
};

router.use(routersBase.odersV1, ordersRouter);

export default router;