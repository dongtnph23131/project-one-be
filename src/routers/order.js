const { Router } = require("express");
const {
  createOrder,
  getOrderById,
  getOrderByUser,
  getOrders,
  updateOrderStatusAdmin,
} = require("../controllers/order");

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:orderId", getOrderById);
router.patch("/orders/:orderId/update-admin-status", updateOrderStatusAdmin);
router.get("/orders/:userId/user", getOrderByUser);
module.exports = router;
