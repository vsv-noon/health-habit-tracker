import { useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={styles.ErrorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{(error as Error).message}</p>
    </div>
  );
}
