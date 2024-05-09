const { Router } = require("express");
const {
  create,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} = require("../controllers/product");

const router = Router();
router.post("/products", create);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProductById);
router.patch("/products/:id", updateProductById);
module.exports = router;
