import { OrderDTO } from "@/dto/orders/oder.dto";
import { ordersRepository } from "@/repository/orders/index";
import type { OrderInterface, OrdersServiceGetResponse } from "@/shared/types/index";
import type { UUIDTypes } from "uuid";

export const ordersService = {
    get: async (limit: number, skip: number, filter: { [key: string]: any }): Promise<OrdersServiceGetResponse> => {
        const orders = await ordersRepository.get(limit, skip, filter);
        const newData = orders.map(order => (
            OrderDTO.response(order)
        ));
        const ordersCount = await ordersRepository.count(filter);
        const totalPages = Math.ceil(ordersCount / limit);
        return {
            ordersCount,
            totalPages,
            data: newData
        };
    },

    findById: async (id: UUIDTypes) => {
        const order = await ordersRepository.findById(id);
        return order;
    },

    create: async (data: Partial<OrderInterface>): Promise<OrderInterface> => {
        const order = await ordersRepository.create(data);
        return order
    },

    update: async (id: UUIDTypes, data: Partial<OrderInterface>) => {
        const order = await ordersRepository.update(id, data);
        return order;
    },

    delete: async (id: UUIDTypes): Promise<OrderInterface | null> => {
        const order = await ordersRepository.delete(id);
        return order
    },
};