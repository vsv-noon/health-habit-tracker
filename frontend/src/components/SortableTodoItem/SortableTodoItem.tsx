// import { CSS } from '@dnd-kit/utilities';
// import { useSortable } from '@dnd-kit/sortable';
// import type { Todo } from '../../types/todo';

// type SortableTodoItemProps = {
//   todo: Todo;
//   onEdit: (todo: Todo) => void;
//   onUpdate: () => void;
//   onDelete: (todo: Todo) => void;
// };

// export function SortableTodoItem({ todo, onEdit, onUpdate, onDelete }: SortableTodoItemProps) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     cursor: 'grab',
//   };

//   return (
//     <li
//       key={todo.id}
//       className="todoItem"
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >
//       <input
//         type="checkbox"
//         title="select to complete"
//         checked={todo.completed}
//         onChange={onUpdate}
//         onPointerDown={(e) => e.stopPropagation()}
//       />

//       <span
//         className="title"
//         style={{
//           textDecoration: todo.completed ? 'line-through' : 'none',
//         }}
//       >
//         {todo.title}
//       </span>
//       <span>{todo.description}</span>

//       <div className="actions" onPointerDown={(e) => e.stopPropagation()}>
//         <button onClick={() => onEdit(todo)}>✏️</button>

//         <button onClick={() => onDelete(todo)}>🗑</button>
//       </div>
//       <span>{todo.due_date}</span>
//     </li>
//   );
// }
