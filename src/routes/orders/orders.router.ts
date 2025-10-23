import { type Request, type Response } from 'express';
import { ordersController } from "@/controllers/orders.controller";
import { Router } from "express";

const ordersRouter = Router();

ordersRouter.get('/', (req: Request, res: Response) => ordersController.get(req, res));

ordersRouter.get('/:id', (req: Request, res: Response) => ordersController.get(req, res));

ordersRouter.post('/', (req: Request, res: Response) => ordersController.get(req, res));

ordersRouter.put('/:id', (req: Request, res: Response) => ordersController.get(req, res));

ordersRouter.delete('/:id', (req: Request, res: Response) => ordersController.get(req, res));

export default ordersRouter;