import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(cors());
app.use(express.json());

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
