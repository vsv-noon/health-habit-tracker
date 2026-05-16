import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import Dropdown from '../Dropdown';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={styles.navLink}
          style={({ isActive, isPending }) => ({
            color: isActive ? 'grey' : isPending ? 'blue' : 'black',
          })}
          to="/"
        >
          🏠 Home
        </NavLink>
        {user && (
          <>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/goals"
            >
              Goals
            </NavLink>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/todos"
            >
              Todos
            </NavLink>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/tasks"
            >
              Tasks
            </NavLink>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/measurements"
            >
              Measurements
            </NavLink>
            <NavLink
              className={styles.navLink}
              style={({ isActive, isPending }) => ({
                color: isActive ? 'grey' : isPending ? 'blue' : 'black',
              })}
              to="/trash"
            >
              🗑 Trash
            </NavLink>
          </>
        )}
        <NavLink
          className={styles.navLink}
          style={({ isActive, isPending }) => ({
            color: isActive ? 'grey' : isPending ? 'blue' : 'black',
          })}
          to="/about"
        >
          ℹ️ About
        </NavLink>
      </nav>
      {!user && (
        <div>
          <NavLink className={styles.userBtn} to="/login">
            Sign in
          </NavLink>
        </div>
      )}
      {user && <Dropdown />}
    </header>
  );
};

export default Header;
