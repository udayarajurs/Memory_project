import express from "express";
import { getPostes , createPost , updatePost , deletePost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPostes);
router.post("/", createPost);
router.patch('/:id', updatePost)
router.delete('/:id', deletePost);

export default router;