const express = require("express");
const router = express.Router();
const Item = require("../../Model/Rent/Rent");
const itemController = require("../../Controllers/Rent/RentController");

router.get("/", itemController.getAllItems);
router.post("/", itemController.addItem);
router.get("/:id", itemController.getItemById);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
