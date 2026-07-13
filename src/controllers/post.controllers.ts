import { Request, Response } from "express";
import { prisma } from "../database/prisma";

const client = prisma;

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "The post must have Title and Content." });
    }

    const newPost = await client.post.create({
      data: {
        title,
        content,
        category,
        tags,
      },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed in create post." });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await client.post.findMany();
    return res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed in list all posts." });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await client.post.findFirst({
      where: { id: Number(id) },
    });

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed to find the post." });
  }
};

export const getFiltered = async (req: Request, res: Response) => {
  try {
    const { term } = req.query;

    const searchFilter = term
      ? {
          OR: [
            { title: { contains: String(term), mode: "insensitive" as const } },
            {
              content: { contains: String(term), mode: "insensitive" as const },
            },
            {
              category: {
                contains: String(term),
                mode: "insensitive" as const,
              },
            },
            { tags: { has: String(term) } },
          ],
        }
      : {};

    const posts = await client.post.findMany({
      where: searchFilter,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Failed to list posts with the term" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to delete the post." });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    const updatedPost = await client.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        category,
        tags,
      },
    });

    return res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Failed to update the post or post not found." });
  }
};
