const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    priceSelling: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    purchases: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
