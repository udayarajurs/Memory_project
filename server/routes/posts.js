import express from "express";
import { getPostes , createPost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPostes);
router.post("/", createPost);


export default router;