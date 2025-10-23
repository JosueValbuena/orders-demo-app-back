import { ordersDatasouce } from '@/datasource/mongo/index';
import type { OrderInterface } from '@/shared/types/index';
import type { UUIDTypes } from 'uuid';

export const ordersRepository = {

    get: async (limit: number, skip: number, filter: { [key: string]: any }): Promise<Omit<OrderInterface[], 'id'>> => {
        const orders = await ordersDatasouce.get(limit, skip, filter);
        return orders
    },

    count: async (filters: { [key: string]: any }) => {
        const ordersCount = await ordersDatasouce.count(filters);
        return ordersCount;
    },

    findById: async (id: UUIDTypes) => {
        const order = await ordersDatasouce.findById(id);
        return order;
    },

    create: async (data: Partial<OrderInterface>): Promise<OrderInterface> => {
        const order = await ordersDatasouce.create(data);
        return order
    },

    update: async (id: UUIDTypes, data: Partial<OrderInterface>) => {
        const order = await ordersDatasouce.update(id, data);
        return order;
    },

    delete: async (id: UUIDTypes): Promise<OrderInterface | null> => {
        const order = await ordersDatasouce.delete(id);
        return order
    },
};