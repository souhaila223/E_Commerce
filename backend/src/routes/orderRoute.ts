import express from "express";
import validateJWT from "../middlewares/validateJWT";
import isAdmin from "../middlewares/IsAdmin";
import { getMyOrders, updateOrderStatus, getAllOrders } from "../services/orderService";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/my-orders", validateJWT, async (request: ExtendRequest, response) => {
    try {
      const userId = request?.user?._id;
      const { data, statusCode} = await getMyOrders({userId});
      response.status(200).send(data);
    } catch (err) {
      response.status(500).send("Something went wrong!");
    }
  });
  
  router.get("/orders", validateJWT, isAdmin, async (req, res) => {
    try {
      const { statusCode, data } = await getAllOrders();
      res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
  });
  
  router.put("/:orderId/status", validateJWT, isAdmin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const updatedOrder = await updateOrderStatus(orderId, status);
      
      if (!updatedOrder) {
        return res.status(404).send("Order not found");
      }
  
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.error("Error in PUT /order/:orderId/status route:", err); // Add log
      res.status(500).send("Something went wrong!");
    }
  });

  export default router;