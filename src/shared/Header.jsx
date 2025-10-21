import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink className={styles.navLink} to="/">
          Home
        </NavLink>
        <NavLink className={styles.navLink} to="/plants">
          MyPlants
        </NavLink>
        <NavLink className={styles.navLink} to="/about">
          About
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
