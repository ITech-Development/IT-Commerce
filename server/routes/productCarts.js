const express = require("express");
const ProductCartController = require("../controllers/productCartController");
const router = express.Router();
const { authenticationUser } = require("../middlewares/auth");

router.use(authenticationUser)
router.get("/", ProductCartController.getAllProductCarts);
router.get("/count-carts", ProductCartController.getCountCarts);
router.get("/itech", ProductCartController.getAllProductsItech);
router.get("/indo-riau", ProductCartController.getAllProductsIndoRiau);
router.get("/indo-teknik", ProductCartController.getAllProductsIndoTeknik);
router.get("/juvindo", ProductCartController.getAllProductsJuvindo);
router.post("/", ProductCartController.addProductCart);
router.delete("/clear/", ProductCartController.clearProductCart)
router.patch("/decrement/:id", ProductCartController.decrementQtyProductCart);
router.patch("/increment/:id", ProductCartController.incrementQtyProductCart)
router.delete("/remove/:id", ProductCartController.removeProductCart)
router.get("/:id", ProductCartController.detailsProductCart);

module.exports = router;