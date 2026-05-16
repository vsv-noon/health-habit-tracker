import { useAuth } from '../../context/AuthContext/useAuth';

import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

const Dropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={menuRef}>
      <button className={styles.userBtn} onClick={() => setOpen((prev) => !prev)}>
        {user?.email}
      </button>
      {open && (
        <div className={open ? `${styles.dropdown} ${styles.open}` : styles.dropdown}>
          <button className={styles.dropdownBtn}>Profile</button>
          <button className={styles.dropdownBtn}>Settings</button>
          <button className={styles.dropdownBtn} onClick={logout}>
            Sing Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
