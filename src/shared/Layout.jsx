import { useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

import Header from './Header';
function Layout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Todo List');

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/plants/')) {
      setPageTitle('Plant Details');
    } else {
      switch (path) {
        case '/':
          setPageTitle('Plant Care');
          break;
        case '/plants':
          setPageTitle('My Plant Collection');
          break;
        case '/about':
          setPageTitle('About');
          break;
        default:
          setPageTitle('Not Found');
      }
    }
  }, [location]);
  return (
    <div className="appWrapper">
      <Header title={pageTitle} />
      <main className={styles.contentWrapper}>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
