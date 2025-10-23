import { OrderDTO } from '@/dto/orders/oder.dto';
import { OrderModel } from '@/models/orders.model';
import type { OrderInterface } from '@/shared/types/index';
import type { UUIDTypes } from 'uuid';

export const ordersDatasouce = {

    get: async (limit: number, skip: number, filter: { [key: string]: any }): Promise<Omit<OrderInterface[], 'id'>> => {
        const orders = await OrderModel
            .find(filter)
            .skip(skip)
            .limit(limit);
        const newData = orders.map(order => (
            OrderDTO.response(order)
        ));
        return newData
    },

    count: async (filters: { [key: string]: any }) => {
        const ordersCount = await OrderModel.countDocuments(filters);
        return ordersCount;
    },

    findById: async (id: UUIDTypes): Promise<OrderInterface | null> => {
        const order = await OrderModel.findById(id);
        return order;
    },

    create: async (data: Partial<OrderInterface>): Promise<OrderInterface> => {
        const newOrder = new OrderModel(data);
        const orderSaved = await newOrder.save();
        return orderSaved
    },

    update: async (id: UUIDTypes, data: Partial<OrderInterface>): Promise<OrderInterface | null> => {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, data, {
            new: true
        });
        return updatedOrder
    },

    delete: async (id: UUIDTypes): Promise<OrderInterface | null> => {
        const order = await OrderModel.findByIdAndDelete(id);
        return order
    },
};