const { StatusCodes } = require("http-status-codes");
const Category = require("../models/category");
const slugify = require("slugify");
const Product = require("../models/product");
exports.create = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      slug: slugify(req.body.name, "-"),
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ category, message: "Thêm danh mục sản phẩm thành công" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không có danh mục nào!" });
    }
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
exports.remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ category: req.params.id });
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    const category = await Category.findById(req.params.id);
    if (category.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm nào!" });
    return res.status(StatusCodes.OK).json({
      category,
      products,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
exports.updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
