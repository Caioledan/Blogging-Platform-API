# Blogging Platform API

A RESTful API developed to manage blog posts, based on the project suggested by [roadmap.sh](https://roadmap.sh/projects/blogging-platform-api). 

This API allows creating, reading, updating, and deleting (CRUD) posts, and features an advanced search system by terms (filtering by title, content, category, and tags).

---

## Technologies Used

The project was built using a modern and scalable architecture:

* **Node.js** with **Express** (Routing and Server)
* **TypeScript** (Static typing for greater security and productivity)
* **Prisma ORM** (Database communication)
* Relational Database (Configured via Prisma)

---

## Project Architecture

The folder structure was organized to separate responsibilities:

```text
src/
├── controllers/    # Business logic and request handling (post.controllers.ts)
├── database/       # Prisma Client initialization and configuration (prisma.ts)
├── routes/         # Application routes definition (post.routes.ts, index.ts)
```

---

## How to run the project locally

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables Configuration:**
   Create a `.env` file in the root of the project and add your database URL:
   ```env
   DATABASE_URL="your_connection_string_here"
   PORT=3000
   ```

3. **Initialize the Database (Prisma):**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *(The server will run on port 3000 by default, or on the port defined in your .env).*

---

## API Endpoints

Below are the available routes in the application. The base prefix for all routes is `/posts`.

| Method | Route              | Description                                                               |
| :---   | :---               | :---                                                                      |
| `POST` | `/posts/create`    | Creates a new post. Requires `title` and `content` in the body.           |
| `GET`  | `/posts/listall`   | Returns a list of all blog posts.                                         |
| `GET`  | `/posts/list/:id`  | Returns the details of a specific post by its `id`.                       |
| `GET`  | `/posts/search`    | Searches for posts. Send the term via Query Params (e.g., `?term=technology`).|
| `PATCH`| `/posts/update/:id`| Updates the data of an existing post by its `id`.                         |
| `DELETE`| `/posts/delete/:id`| Deletes an existing post by its `id`.                                     |

### Creation Payload Example (`/posts/create`):
```json
{
   "title": "My First Post",
   "content": "Post content...",
   "category": "Technology",
   "tags": ["Tech", "Programming"]
}
```

---
