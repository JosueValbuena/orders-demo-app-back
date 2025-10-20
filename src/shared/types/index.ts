export interface OrderInterface {
  id?: string,
  customer_name: string,
  item: string,
  quantity: number,
  status: StatusType,
  created_at: Date
};

export type StatusType = 'pending' | 'completed' | 'cancelled';

export interface OrdersServiceGetResponse {
  ordersCount: number;
  totalPages: number;
  data: OrderInterface[];
}