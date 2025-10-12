import { useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './Header';
function Layout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Todo List');

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPageTitle('Plant Care');
        break;
      case '/plants':
        setPageTitle('My Plants');
        break;
      case '/newplant':
        setPageTitle('Add A New Plant');
        break;
      case '/about':
        setPageTitle('About');
        break;
      default:
        setPageTitle('Not Found');
    }
  }, [location]);
  return (
    <div className="app-wrapper">
      <Header title={pageTitle} />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
