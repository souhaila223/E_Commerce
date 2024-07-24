import mongoose, { Schema, ObjectId, Document } from "mongoose";

// Define the interface for an order item
// This interface describes the shape of an individual item within an order
export interface IOrderItem {
    productTitle: string;    // Title of the product
    productImage: string;    // Image URL of the product
    unitPrice: number;       // Price per unit of the product
    quantity: number;        // Quantity of the product ordered
}

// Define the interface for an order
// This interface describes the shape of an order document
export interface IOrder extends Document {
    orderItems: IOrderItem[];  // Array of order items
    total: number;             // Total price of the order
    address: string;           // Shipping address for the order
    userId: ObjectId | string; // User ID of the person who placed the order (ObjectId for MongoDB)
    orderStatus: string;
}

// Create a schema for order items using the IOrderItem interface
// This schema maps to a MongoDB collection and defines the shape of the documents within that collection
const OrderItemSchema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },   // Product title, required field
    productImage: { type: String, required: true },   // Product image URL, required field
    unitPrice: { type: Number, required: true },      // Unit price, required field
    quantity: { type: Number, required: true }        // Quantity, required field
});

// Create a schema for orders using the IOrder interface
// This schema defines the structure of an order document
const OrderSchema = new Schema<IOrder>({
    orderItems: [OrderItemSchema],                    // Array of order items, uses the OrderItemSchema
    total: { type: Number, required: true },          // Total price of the order, required field
    address: { type: String, required: true },        // Shipping address, required field
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User ID, references the "User" collection, required field
    orderStatus: { type: String, default: 'Pending' },
});

// Create a model for orders using the OrderSchema
// This model provides an interface for interacting with the orders collection in MongoDB
export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
