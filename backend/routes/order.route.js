import express from "express";
import { prepareOrder, getOrderList } from "../controllers/order.controller.js";
import { createOrderSchema } from "../validators/order.shcema.js";
import { payOrderSchema } from "../validators/order.shcema.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.post(
  "/intent",
  validate(createOrderSchema),
  prepareOrder
);

router.get("/list", getOrderList);

router.post(
  "/:orderId/pay",
  validate(payOrderSchema),
  async (req, res) => {

  }
);



export default router;
