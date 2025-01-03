const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdmin = require("../models/Middlewares/authMiddleware");
router.use(authAdmin.authMiddleisAdmin);
router.get("/add-product" , adminController.getAddProduct);
router.post("/add-product" , adminController.postAddProduct);
router.get("/products",adminController.getProducts);
router.get("/delete-product/:ProductID" , adminController.getDeleteProduct);
router.get("/edit-product/:ProductID" , adminController.getEditProduct);
router.post("/edit-product" , adminController.postEditProduct); 

module.exports = router;