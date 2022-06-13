import express from "express";
import { getPostBySearch , getPostes , createPost , updatePost , deletePost , likePost , getPost} from "../controllers/posts.js";


const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/search", getPostBySearch);
router.get("/", getPostes);
router.get("/:id", getPost);
router.post("/",auth , createPost);
router.patch('/:id',auth , updatePost)
router.delete('/:id',auth , deletePost);
router.patch('/:id/likePost',auth, likePost);


export default router;