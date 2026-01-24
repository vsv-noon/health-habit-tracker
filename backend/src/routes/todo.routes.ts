import { Router } from 'express';
import * as todoController from '../controllers/todo.controller.js';
// import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// router.use(authMiddleware);

router.get('/', todoController.getTodos);
router.get('/calendar-counts', todoController.getCalendarCounts);
router.get('/suggestions', todoController.getTitleSuggestions);
router.get('/deleted', todoController.getDeletedTodos)

router.post('/', todoController.createTodo);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

router.post('/bulk-restore', todoController.bulkRestoreTodos);
router.post('/bulk-delete', todoController.bulkHardRDeleteTodos);

export default router;
