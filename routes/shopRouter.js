const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const isAuth = require("../models/Middlewares/authMiddleware");
router.use(isAuth.authMiddleAuth);
router.get("/", shopController.getHome);
router.get("/products", shopController.getProducts);
router.get("/cart" , shopController.getCart);
router.post("/cart" , shopController.postCart);
router.post("/cart-delete-item" , shopController.postCartDeleteitems);
router.post("/create-order" , shopController.createOrder);
router.get("/orders", shopController.getOrders);
router.get("/about" , shopController.getAboutUs);

module.exports = router;