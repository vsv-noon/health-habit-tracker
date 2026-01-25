// import { useAuth } from '../context/AuthContext';
// import { Outlet } from 'react-router-dom';

// export function AppLayout() {
//   const { user, logout } = useAuth();
//   return (
//     <div>
//       {user && (
//         <header>
//           <div>
//             <h1>Todo App</h1>
//             <div>
//               <span>{user.email}</span>
//               <button onClick={logout}>Logout</button>
//             </div>
//           </div>
//         </header>
//       )}
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }
