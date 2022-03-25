import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Icon } from '../../assets/nodepopIcon.svg';

import './Header.css';
import AuthButton from '../auth/AuthButton';

function Header({ className }) {
  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
        >
          New advert
        </NavLink>
        <NavLink
          to="/adverts"
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
          end
        >
          See all adverts
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
