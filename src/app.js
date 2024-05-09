const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cateroryRouter = require("./routers/category");
const productRouter = require("./routers/product");
const cartRouter = require("./routers/cart");
const orderRouter = require("./routers/order");
const authRouter = require("./routers/auth");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1", authRouter);
app.use("/api/v1", cateroryRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);
app.listen(8080, async () => {
  await mongoose.connect(
    "mongodb+srv://donghaha:123456abc@ecommerce.ylijltl.mongodb.net/project-one-be?retryWrites=true"
  );
});
