import { orderModel } from "../models/orderModel";


interface GetMyOrdersParams {
    userId: string;
  }

export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (err) {
    throw err;
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await orderModel.find().populate('userId').exec(); // Populate userId to get user details if needed
    return { statusCode: 200, data: orders };
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { statusCode: 500, data: "Something went wrong!" };
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const order = await orderModel.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true }).exec();
    if (!order) {
      return { statusCode: 404, data: "Order not found" };
    }
    return { statusCode: 200, data: order };
  } catch (err) {
    console.error("Error updating order status:", err);
    return { statusCode: 500, data: "Something went wrong!" };
  }
};