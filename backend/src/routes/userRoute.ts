import express from "express";
import { deleteUser, getAllUsers, login, register, updateUserStatus } from "../services/userService";
import { ExtendRequest } from "../types/extendedRequest";
import validateJWT from "../middlewares/validateJWT";
import isAdmin from "../middlewares/IsAdmin";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = request.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
      isAdmin
    });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});


router.get("/users", validateJWT, isAdmin, async (request, response) => {
  console.log("GET /users route called");
  try {
    const { statusCode, data } = await getAllUsers();
    console.log(`Response statusCode: ${statusCode}, data: ${data.length} users`);
    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error in GET /users route:", err);
    response.status(500).send("Something went wrong!");
  }
});

router.put("/userStatus/:userId", validateJWT, isAdmin, async (request, response) => {
  try {
    const { userId } = request.params;
    const { isAdmin } = request.body;
    const { statusCode, data } = await updateUserStatus({ userId, isAdmin });
    response.status(statusCode).json(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});


router.delete("/user/:userId", validateJWT, isAdmin, async (req, res) => {
  console.log("DELETE /user/:userId route called"); // Add lo
  try {
    const { userId } = req.params;
    console.log(`User ID to delete: ${userId}`); // Add log
    const { statusCode, data } = await deleteUser({userId});
    console.log(`Response statusCode: ${statusCode}, data: ${data}`); // Add log
    res.status(statusCode).json(data);
  } catch (err) {
    console.error("Error in DELETE /user/:userId route:", err); // Add log
    res.status(500).send("Something went wrong!");
  }
});


export default router;
