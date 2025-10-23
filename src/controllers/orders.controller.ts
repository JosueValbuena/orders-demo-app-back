import { type Request, type Response } from 'express';
import { ordersService } from "@/services";
import mongoose from 'mongoose';
import { OrderDTO } from '@/dto/orders';

export const ordersController = {

    get: async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const status = req.query.status;

            const filter: { [key: string]: any } = {};
            if (status) {
                filter.status = status;
            }

            const data = await ordersService.get(limit, skip, filter);

            return res
                .status(200)
                .json({
                    code: 200,
                    status: 'success',
                    message: 'Ordsers request succefull',
                    page: page,
                    page_size: 10,
                    total_results: data.ordersCount,
                    total_pages: data.totalPages,
                    data: data.data
                });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    code: 500,
                    status: 'fail',
                    error:
                        'Internal server error'
                });
        };
    },

    findById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id) return res
                .status(400)
                .json({
                    code: 400,
                    status: 'fail',
                    error: 'ID is required'
                });
            if (!mongoose.Types.ObjectId.isValid(id)) return res
                .status(400)
                .json({
                    code: 400,
                    status: 'fail',
                    error: 'Not valid ID'
                });

            const order = await ordersService.findById(id);

            if (!order) return res
                .status(404)
                .json({
                    code: 404,
                    status: 'fail',
                    error: `Order with ID ${id} not found.`
                });

            return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Orders request succefull',
                data: OrderDTO.response(order)
            });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    code: 500,
                    status: 'fail',
                    error: 'Internal server error'
                });
        };
    },

    create: async (req: Request, res: Response) => {
        const body = req.body;
        const [error, data] = OrderDTO.create(body);
        if (error || !data) return res.status(400).json({ code: 400, status: 'fail', error: error ?? 'Invalid data' });
        try {
            const newOrder = await ordersService.create(data);
            return res
                .status(201)
                .json({
                    code: 201,
                    message: 'Order created succefull',
                    data: OrderDTO.response(newOrder)
                });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    code: 500,
                    status: 'fail',
                    error: 'Internal server error'
                });
        };
    },

    update: async (req: Request, res: Response) => {
        const id = req.params.id?.trim();

        if (!id) return res
            .status(400)
            .json({
                code: 400,
                status: 'fail',
                error: 'ID is required'
            });
        if (!mongoose.Types.ObjectId.isValid(id)) return res
            .status(400)
            .json({
                code: 400,
                status: 'fail',
                error: 'Not valid ID'
            });

        const body = req.body;
        const [error, data] = OrderDTO.create(body);
        if (error || !data) return res
            .status(400)
            .json({
                code: 400,
                status: 'fail',
                error: error
            });
        try {
            const order = await ordersService.findById(id);

            if (!order) return res
                .status(400)
                .json({
                    code: 400,
                    status: 'fail',
                    error: `Order with id ${id} doesn't exist`
                });

            const updatedOrder = await ordersService.update(id, data);

            return res
                .status(200)
                .json({
                    code: 200,
                    status: 'success',
                    message: 'Order edited succefull',
                    data: OrderDTO.response(updatedOrder!)
                });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    code: 500,
                    status: 'fail',
                    error: 'Internal server error'
                });
        };
    },

    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id) return res
                .status(400)
                .json({
                    code: 400,
                    status: 'fail',
                    error: 'ID is required'
                });

            if (!mongoose.Types.ObjectId.isValid(id)) return res
                .status(400)
                .json({
                    code: 400,
                    status: 'fail',
                    error: 'Not valid ID'
                });

            const order = await ordersService.delete(id);

            if (!order) return res.status(404).json({
                code: 404,
                status: 'error',
                message: `Order with ID ${id} not found`
            });

            return res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Orders deleted succefull'
            });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                    code: 500,
                    status: 'fail',
                    error: 'Internal server error'
                });
        };
    },
};