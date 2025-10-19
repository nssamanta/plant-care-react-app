import { NavLink } from 'react-router';
function Header({ title }) {
  return (
    <header>
      <div>
        <h1>{title}</h1>
      </div>
      <nav className="nav">
        <NavLink to="/" className="home">
          Home
        </NavLink>
        <NavLink to="/plants" className="allplants">
          MyPlants
        </NavLink>
        <NavLink to="/about" className="about">
          About
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
