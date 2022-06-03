import express from "express";
import { getPostes , createPost , updatePost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPostes);
router.post("/", createPost);
router.patch('/:id', updatePost)

export default router;