export interface IOrderItem {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
  }
  
  export interface IOrder {
    _id: string;
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: string;
    orderStatus: string;
  }