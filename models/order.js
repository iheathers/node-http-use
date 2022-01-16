const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  items: [
    {
      product: {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = model("Order", orderSchema);

module.exports = { Order };
