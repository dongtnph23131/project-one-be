const { Router } = require("express");
const {
  create,
  getAll,
  getCategoryById,
  remove,
  updateCategoryById,
} = require("../controllers/category");
const { checkAuth } =require("../middleware/checkAuth");

const router = Router();
router.post("/categories", checkAuth, create);
router.get("/categories", getAll);
router.delete("/categories/:id", remove);
router.get("/categories/:id", getCategoryById);
router.patch("/categories/:id", updateCategoryById);
module.exports = router;
