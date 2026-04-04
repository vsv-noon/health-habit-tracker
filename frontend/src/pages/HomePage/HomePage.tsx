// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiFetch } from '../../api/client';
// import Loader from '../../components/Loader/Loader';

import './style.css';

export default function HomePage() {
  // const navigate = useNavigate();
  // // const [user, setUser] =
  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     setLoading(true);
  //     const token = localStorage.getItem('accessToken');

  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const data = await apiFetch('/users/me');

  //       if (data) {
  //         localStorage.setItem('user', JSON.stringify(data));
  //       }
  //     } catch (error) {
  //       console.error('Ошибка загрузки профиля', error);
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('accessToken');
  //       localStorage.removeItem('refreshToken');
  //       navigate('/login');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, [navigate]);

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="home-page-container">
        <h1>PERN Goals Tracker</h1>
      </div>
    </>
  );
}
