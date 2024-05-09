const { Router } = require("express");
const {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  removeItemCart,
} = require("../controllers/cart");

const router = Router();

router.post("/carts/add-to-cart", addItemToCart);
router.get("/carts/:userId", getCartByUserId);
router.post("/carts/decrease", decreaseProductQuantity);
router.post("/carts/remove-item", removeItemCart);
module.exports= router;
