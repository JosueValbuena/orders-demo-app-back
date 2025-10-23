import type { OrderInterface, StatusType } from "@/shared/types/index";
import { orderKeys } from "@/shared/utils/index";

export class OrderDTO {
    private constructor(
        public readonly customer_name: string,
        public readonly item: string,
        public readonly quantity: number,
        public readonly status: StatusType,
    ) { };

    static create(props: { [key: string]: any }): [string | null, OrderDTO | null] {

        const {
            customer_name,
            item,
            quantity,
            status
        } = props;

        const requiredProperties: string[] = [
            'customer_name',
            'item'
        ];

        const missingKey = requiredProperties.find(key => !(key in props));

        if (missingKey) {
            return [`Property "${missingKey}" is required`, null];
        };

        if (!['pending', 'completed', 'cancelled'].includes(status)) {
            return [`status must be one of these: pending', 'completed', 'cancelled`, null];
        };

        const validKeys = Object.keys(props)
            .find((propKey: string) => !orderKeys.some((orderKey: string) => orderKey === propKey));

        if (validKeys) {
            return [`${validKeys} is not valid parametrer`, null];
        }

        return [null, new OrderDTO(
            customer_name,
            item,
            Number(quantity) || 1,
            status || 'pending',
        )];
    };

    static response(props: { [key: string]: any }): OrderInterface {
        const cleanProps = props.toObject ? props.toObject() : props;
        const { __v, ...restArgs } = cleanProps;
        return restArgs
    };
};