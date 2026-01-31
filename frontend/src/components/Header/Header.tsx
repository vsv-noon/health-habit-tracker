import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { useState } from 'react';
import { HeaderModal } from '../HeaderModal/HeaderModal';

export function Header() {
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink to="/">🏠 Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {user && <NavLink to="/trash">🗑 Trash</NavLink>}
        <NavLink to="/about">ℹ️ About</NavLink>
      </nav>
      {!user && (
        <div>
          <NavLink to="/login">Sign in</NavLink>
        </div>
      )}
      {user && <button onClick={() => setModalOpen(true)}>{user?.email}</button>}
      <HeaderModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={logout} />
    </header>
  );
}
