import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createRoom,
  getRooms,
  toggleRoomAvailability,
  getOwnerRooms,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 5), protect, createRoom);
roomRouter.get("/", getRooms); //rooms of a hotel details
roomRouter.get("/owner", protect, getOwnerRooms); //get a room data of particular roomOwner
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
