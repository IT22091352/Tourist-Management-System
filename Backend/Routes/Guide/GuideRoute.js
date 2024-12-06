const express = require("express");
const router = express.Router();
const Item = require("../../Model/Guide/Guide");
const itemController = require("../../Controllers/Guide/guideController");

router.get("/", itemController.getAllItems);
router.post("/", itemController.addItem);
router.get("/:id", itemController.getItemById);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
