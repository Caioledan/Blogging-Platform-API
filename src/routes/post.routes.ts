import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFiltered,
  getPost,
  updatePost,
} from "../controllers/post.controllers";

const router = Router();

router.post("/create", createPost);
router.get("/listall", getAllPosts);
router.get("/list/:id", getPost);
router.get("/search", getFiltered);
router.delete("/delete/:id", deletePost);
router.patch("/update/:id", updatePost);

export default router;
