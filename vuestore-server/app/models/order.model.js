module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    user_id: Number,
    cart_items: [
      {
        code: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  });

  schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("orders", schema);
  return Order;
};
