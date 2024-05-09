const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
exports.createOrder = async (req, res) => {
  try {
    const { items, userId } = req.body;
    const order = await Order.create(req.body);
    await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        console.log(product);
        await Product.findByIdAndUpdate(
          product._id,
          {
            countInStock: product.countInStock - item.quantity,
            purchases: product.purchases + item.quantity,
          },
          { new: true }
        );
      })
    );
    await Cart.findOneAndDelete({
      userId,
    });
    return res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    if (order.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No orders found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
exports.updateOrderStatusAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatus = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatus.includes(status)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid status" });
    }

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }

    if (order.status === "delivered" || order.status === "cancelled") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Order cannot be updated" });
    }

    order.status = status;
    await order.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
exports.getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find();
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json(1);
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
