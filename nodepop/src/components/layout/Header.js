import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Icon } from '../../assets/twitter.svg';

import './Header.css';
import AuthButton from '../auth/AuthButton';

function Header({ className }) {
  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          {/* <img src={logo} alt="Twitter-React"></img> */}
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/tweets/new"
          // className={({ isActive }) => (isActive ? 'active' : '')}
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
        >
          New Tweet
        </NavLink>
        <NavLink
          to="/tweets"
          // className={({ isActive }) => (isActive ? 'active' : '')}
          style={({ isActive }) => (isActive ? { color: 'green' } : null)}
          end
        >
          See all tweets
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
