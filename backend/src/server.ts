// import dotenv from "dotenv";
import app from './app.ts';
import cron from 'node-cron';
import { cleanupDeletedTodos } from './cron/cleanupDeletedTodos.ts';
// dotenv.config();

const PORT = process.env.PORT || 5000;

cron.schedule('0 3 * * *', cleanupDeletedTodos);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
