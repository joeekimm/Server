require("dotenv").load();
const Schema = require("mongoose").Schema, mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
const findOneOrCreate = require("mongoose-find-one-or-create");

var connection = mongoose.createConnection(process.env.DATABASE_URL);
autoIncrement.initialize(connection);

var UserSchema = new Schema({
  authId: String,
  firstName: String,
  lastName: String,
  bio: String,
  status: String,
  phoneNumber: String,
  likes: [Number],
  profileUrl: String,
  customerReviews: [],
  chefReviews: [],
  isChef: Boolean,
  location: { geo_lat: Number, geo_lng: Number, address: String },
  rating: Number
});

var DishSchema = new Schema({
  cuisineType: String,
  name: String,
  description: String,
  dishImages: [String],
  chefId: String,
  allergies: [String],
  cashDonation: Number,
  isActive: Boolean,
  quantity: Number
});

var OrderSchema = new Schema({
  chefId: String,
  customerId: String,
  cart: {},
  status: Number,
  date: { type: Date, default: Date.now },
  cashTotal: Number
});

var ReviewSchema = new Schema({
  reviewText: String,
  reviewerId: String,
  score: Number,
  orderId: Number
});

// var ChefReviewSchema = new Schema({
//   reviewText: String,
//   reviewerId: String,
//   revieweeId: String,
//   score: Number,
//   orderId: Number
// });


UserSchema.plugin(findOneOrCreate);
DishSchema.plugin(autoIncrement.plugin, "Dish");
OrderSchema.plugin(autoIncrement.plugin, "Order");
// CustomerReviewSchema.plugin(autoIncrement.plugin, "CustomerReview");
// ChefReviewSchema.plugin(autoIncrement.plugin, "ChefReview");

const User = connection.model("User", UserSchema);
const Dish = connection.model("Dish", DishSchema);
const Order = connection.model("Order", OrderSchema);
// const CustomerReview = connection.model("CustomerReview", CustomerReviewSchema);
// const ChefReview = connection.model("ChefReview", ChefReviewSchema);

module.exports = {
  User: User,
  Dish: Dish,
  Order: Order,
//   ChefReview: ChefReview,
//   CustomerReview: CustomerReview
};

/*
OrderSchema Status Codes
0: pending
1: accepted
2: completed
3: canceled
  
*/
