import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_name: {
        required: true,
        type: String
    },
    item: {
        required: true,
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    created_at: {
        default: Date.now,
        type: Date
    },
})

export const OrderModel = mongoose.model('Order', orderSchema);