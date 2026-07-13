import express from "express";
import postRoutes from "./routes/post.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/posts", postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
