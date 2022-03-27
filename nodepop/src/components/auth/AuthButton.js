import { Link } from 'react-router-dom';
import Button from '../common/Button';

import { logout } from '../auth/service';
import { useAuth } from './context';

function AuthButton({ className }) {
  const { isLogged, handleLogout: onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button
      as={Link}
      to="/login"
      className={className}
      onClick={handleLogoutClick}
    >
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" variant="primary" className={className}>
      Login
    </Button>
  );
}

export default AuthButton;
