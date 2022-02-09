const { Schema, model } = require("mongoose");

const { Product } = require("./product");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let updatedQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  const existingCartItemIndex = this.cart.items.findIndex(
    (cartItem) => cartItem.productId.toString() === product._id.toString()
  );

  if (existingCartItemIndex >= 0) {
    updatedCartItems[existingCartItemIndex].quantity++;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: updatedQuantity,
    });
  }

  this.cart.items = updatedCartItems;
  this.save();
};

userSchema.methods.getCart = async function () {
  const cartProducts = [];

  for (const cartItem of this.cart.items) {
    const product = await Product.findById(cartItem.productId);

    if (product) {
      cartProducts.push({
        id: product.id,
        title: product.title,
        price: product.price,
        imageURL: product.imageURL,
        description: product.description,
        quantity: cartItem.quantity,
      });
    }
  }

  return cartProducts;
};

userSchema.methods.deleteCartItem = function (productID) {
  try {
    const updatedItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productID
    );

    this.cart.items = updatedItems;
    this.save();
  } catch (error) {
    console.log("deleteItem", { error });
  }
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  this.save();
};

const User = model("User", userSchema);

module.exports = { User };
